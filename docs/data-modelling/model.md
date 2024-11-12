---
sidebar_position: 1
title: Model
---

### Introduction

Pocketto Model allow you to create a model for your data. It is a simple and easy way to create a model for your data.

You can share the model in different platforms, so all the platforms can use the same model with same application logic.

### Define a Model

To define a model, you need to create a class that extends the `Model` class. The `Model` class is a base class that provides the basic functionality for a model.


In the following example, we define a `SalesInvoiceItem` model and a `SalesInvoice` model.
```ts
import { Model } from 'pocketto';

@Relational
export class SalesInvoiceItem extends Model {
  static dbName = 'my-database';
  static collectionName = 'SalesInvoiceItems';

  description!: string;
  quantity!: number;
  unitPrice!: number;

  get amount() {
    return this.quantity * this.unitPrice;
  }
}

@Relational
export class SalesInvoice extends Model {
  static dbName = 'my-database';
  static collectionName = 'SalesInvoices';

  invoiceNumber!: string;
  customerName!: string;
  remarks?: string;

  @HasMany('SalesInvoiceItem')
  items?: SalesInvoiceItem[];

  get totalAmount() {
    return this.items?.reduce((total, item) => total + item.amount, 0) ?? 0;
  }
}
```
The decorator `@Relational` is used to define the model as a relational model. The `@HasMany` decorator is used to define a one-to-many relationship between the `SalesInvoice` model and the `SalesInvoiceItem` model.


### Create an Instance

To create an instance of a model, you can use the `new` keyword.

```ts
const invoice = new SalesInvoice();
invoice.invoiceNumber = 'INV-001';
invoice.customerName = 'John Doe';
invoice.remarks = 'This is a sample invoice.';
invoice.items = [
  { description: 'Item 1', quantity: 2, unitPrice: 100 },
  { description: 'Item 2', quantity: 3, unitPrice: 150 },
];

// or

const invoice = new SalesInvoice({
  invoiceNumber = 'INV-001',
  customerName = 'John Doe',
  remarks = 'This is a sample invoice.';
  items = [
    { description: 'Item 1', quantity: 2, unitPrice: 100 },
    { description: 'Item 2', quantity: 3, unitPrice: 150 },
  ],
});
```

### Save an Instance

To save an instance of a model, you can use the `save` method.

```ts
await invoice.save();
```

### Find an Instance

To find an instance of a model, you can use the `find` method.

```ts
const invoice = await SalesInvoice.find('INV-001');
```
### Find all Instances

To get all instances of a model, you can use the `all` method.

```ts
const invoice = await SalesInvoice.all();
```

### Update an Instance

To update an instance of a model, you can use the `update` method.

```ts
invoice.update({
  remarks: 'This is an updated invoice.',
});
```

### Delete an Instance

To delete an instance of a model, you can use the `delete` method.

```ts
await invoice.delete(true);
```
