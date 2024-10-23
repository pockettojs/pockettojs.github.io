---
sidebar_position: 2
title: Query Builder
---

### Introduction

Pocketto Query Builder allows you to build queries for your data. It is a simple and easy way to build queries for your data.

### Build a Query

You can utilize `Model.query()` to build a query. The `query()` method returns a new instance of the `QueryBuilder` class.

In the following example, we build a query to get all sales invoices with a total amount greater than 1000.

```ts
import { SalesInvoice } from './models';

const invoices = await SalesInvoice.query()
  .where('totalAmount', '>', 1000)
  .get();
```

The `where()` method is used to add a condition to the query. The first argument is the field name, the second argument is the operator, and the third argument is the value.

If you want to only get the first result, you can use the `first()` method.

```ts
const invoice = await SalesInvoice.query()
  .where('invoiceNumber', '=', 'INV-001')
  .first();
```

### Complex Queries - Chaining

You can build complex queries by chaining multiple `where` and `orWhere`.

In the following example, we build a query to get all sales invoices with a total amount greater than 1000 or where the customer name is John Doe.

```ts
const invoices = await SalesInvoice.query()
  .where('totalAmount', '>', 1000)
  .orWhere('customerName', '=', 'John Doe')
  .get();
```

### Complex Queries - Callback

You can also able to pass in a callback function to build complex queries.

The callback function receives a `QueryBuilder` instance as an argument.

```ts
import { QueryBuilder } from 'pocketto';

const invoices = await SalesInvoice.query()
  .where((query: QueryBuilder<SalesInvoice>) => {
    query.where('totalAmount', '>', 1000)
      .orWhere('customerName', '=', 'John Doe');
  })
  .get();
```

### Complex Queries - Object

Or, pass a object to build complex queries.

```ts
const invoices = await SalesInvoice.query()
  .where({
    totalAmount: ['>', 1000],
    customerName: ['=', 'John Doe'],
  })
  .get();
```

### Sorting

You can sort the results by using the `orderBy()` method.

```ts
const invoices = await SalesInvoice.query()
  .orderBy('invoiceNumber', 'desc')
  .get();
```

The first argument is the field name, and the second argument is the direction (`asc` or `desc`).

### Pagination

You can paginate the results by using the `paginate()` method.

```ts
const invoices = await SalesInvoice.query()
  .paginate(1, 10);
```

The first argument is the page number, and the second argument is the number of items per page.

### Counting

You can count the results by using the `count()` method.

```ts
const count = await SalesInvoice.query()
  .where('totalAmount', '>', 1000)
  .count();
```
