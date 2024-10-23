---
sidebar_label: Data Sharding
title: Data Sharding
sidebar_position: 5
---

### Data Sharding

Data sharding is a method of partitioning data across multiple servers. It is a technique used to distribute data across multiple servers to improve the performance and scalability of the database. Sharding is a common technique used in distributed databases to improve the performance of the database by distributing the data across multiple servers.

To sharding the model data into different databases, you can declare `shardingMode` in your Model.

```ts
import { Model, setMainDatabaseName, ShardingMode } from 'pocketto';

setMainDatabaseName('master');

class SalesInvoice extends Model {
  static dbName = 'master';
  static shardingMode = ShardingMode.TimeSeries;

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

### Usage - Time Series

To use the time series sharding mode, you can set the `shardingMode` to `ShardingMode.TimeSeries`.

The database will automatically create a new database for each month when you want to create a instance within the period. The database name will be in the format of `master-2021-01`, `master-2021-02`, `master-2021-03`, and so on.

You can pass in `period` as the second argument when creating a new instance.
```ts
const invoice = await Invoice.create({
  invoiceNumber: 'INV-2021-01-001',
  customerName: 'John Doe',
  remarks: 'This is a test invoice',
  items: [
    { description: 'Item 1', quantity: 1, price: 100 },
    { description: 'Item 2', quantity: 2, price: 200 },
  ],
}, '2021-01');
```

You can manage the data by normal method still.
```ts
const savedInvoice = await Invoice.find(invoice.id);
savedInvoice.remarks = 'This is a test invoice updated';
await savedInvoice.save();
```
