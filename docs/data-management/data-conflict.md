---
sidebar_label: Data Conflict
title: Data Conflict
sidebar_position: 4
---

### Introduction

Under the hoods, pocketto are rely on the field `document._meta._rev` to trace for the revision of the document.

When a document is updated, the revision number is incremented. This allows pocketto to detect conflicts when two clients try to update the same document at the same time.

When a conflict occurs, pocketto will return a 409 (conflict) error to the client. The client can then resolve the conflict by fetching the latest version of the document, merging the changes, and then trying to update the document again.

### Two Types of Conflicts

There are two types of conflicts that can occur in the database:

1. Immediate conflicts
2. Eventual conflicts

### Immediate Conflicts

Immediate conflicts can occur with any API that using the same ref to store. They manifest as a 409 (conflict) error:

```typescript
import { SalesInvoice } from 'src/models/SalesInvoice.p';
// 1. Client A create a document call `A`
const invoiceA = new SalesInvoice();
invoiceA.id = '1';
invoiceA.number = 'INV-001';
await invoiceA.save();

console.log(invoice._meta._rev); // 1-x

// 2. Client B create a document call `A` at the same time
try {
  const invoiceB = new SalesInvoice();
  invoiceA.id = '1';
  invoiceA.number = 'INV-001';
  await invoiceA.save();
} catch (error) {
  if (err.name !== 'conflict') return;
  console.log('Conflict happen!:', error); // 409 (conflict)
}
```


:::warning
Normally, `_rev` look more like `2-c1592ce7b31cc26e91d2f2029c57e621`, i.e. a digit followed by a very long hash. In these examples, x and y are used in place of the hash, for simplicity’s sake.
:::

### Eventual Conflicts

Eventual conflicts can occur when both clients are fully offline and then come back online. They manifest as a 409 (conflict) error:

```typescript
const invoiceA = await SalesInvoice.find('1');
```

Imagine the return are the below:
```typescript
SalesInvoice {
  id: "1",
  _meta: {
    _rev: "10-x",
    _before_update: {},
    _dirty: {}
  }
  number: "INV-001",
}
```

In another client that also fetch the same document, and just connect to the internet and update the document:

```typescript
const invoiceB = await SalesInvoice.find('1');
```

```typescript
SalesInvoice {
  id: "1",
  _meta: {
    _rev: "10-y",
    _before_update: {},
    _dirty: {}
  }
  number: "INV-002",
}
```

When the first client try to update the document:

```typescript
invoiceA.number = 'INV-003';
await invoiceA.save();
```

The server will return a 409 (conflict) error:

```typescript
{
  name: 'conflict',
  message: 'Document update conflict',
  status: 409,
  error: true,
  reason: 'Document update conflict',
  revision: '10-y'
}
```

### Solution

To handle the conflict, you can do the below step to ensure the document is updated correctly:
1. Get the latest document via `find` method.
2. Update the field you wish to replace.
3. Save the document again.

```typescript
let invoiceA = await SalesInvoice.find('1');
invoiceA.number = 'INV-003';
try {
  await invoiceA.save();
} catch (error) {
  if (err.name !== 'conflict') return;

 // Get the latest document
  invoiceA = await SalesInvoice.find('1');

  // Merge the changes
  invoiceA.number = 'INV-003';

  // Save the document again
  await invoiceA.save();
}
```
