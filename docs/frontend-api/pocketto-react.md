---
sidebar_label: 'React Hooks'
title: 'React Hooks'
sidebar_position: 1
---

## React Hooks API

### useRealtimeList

By using `useRealtimeList()` hook, the listing will auto retrieve new model when there is new data.
  
```tsx
import React, { useEffect } from 'react';
import { useRealtimeList } from 'pocketto-react';
import { SalesInvoice } from 'src/models/SalesInvoice';

export function SalesInvoiceList() {
  const invoices = useRealtimeList(SalesInvoice);
  const navigate = useNavigate();

  return <div>
    {invoices.map((invoice) => {
      return <div key={invoice.id} onClick={() => navigate(`/invoices/${invoice.id}`)}>
        <h1>{invoice.number}</h1>
      </div>;
    })}
  </div>;
}
```

### useRealtimeList - Configuration

There is also options that you can pass to `useRealtime()`:

- animationDelay: Delay in milliseconds to wait your custom animation done. Default: `1ms`.
- condition: A [query builder](/api-references/pocketto/query-builder) condition to filter and sorting the data.
- onItemChange: Callback when the item is changed. After the `animationDelay` is done, it will emit `undefined`.
- onItemCreate: Callback when the item is created. After the `animationDelay` is done, it will emit `undefined`.
- onItemUpdate: Callback when the item is updated. After the `animationDelay` is done, it will emit `undefined`.

Example:

```tsx
export function SalesInvoiceList() {
  const invoices = useRealtimeList(SalesInvoice, {
    animationDelay: 2000,
    condition: (query) => query.where('status', 'draft').orderBy('date', 'desc'),
    onItemChange: (item) => console.log('Item changed', item),
    onItemCreate: (item) => console.log('Item created', item),
    onItemUpdate: (item) => console.log('Item updated', item),
  });
}
```

### useRealtime

By using `useRealtime()` hook, it will auto reflected to other similar page that have same model id.

```tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRealtime } from 'pocketto-react';
import { SalesInvoice } from 'src/models/SalesInvoice';

export function SalesInvoiceList() {
  const { id } = useParams();
  const [invoice, setInvoice] = useRealtime(SalesInvoice, id);

  return <div>
    <h1>{invoice?.number}</h1>

    <input value={invoice?.number} onChange={(e) => {
        setInvoice({ ...invoice, number: e.target.value });
    }} />

    {/* trigger save to submit to the database */}
    <button onClick={() => invoice.save()}>Save</button>
  </div>;
}
```
