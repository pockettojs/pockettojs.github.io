---
sidebar_label: 'Svelte Stores'
title: 'Svelte Stores'
sidebar_position: 4
---

## Svelte Stores API

Pocketto provides a set of Svelte stores to interact with the Pocketto model in Vue.

### useRealtimeList

By using `useRealtimeList()` composable, the listing will auto retrieve new model when there is new data.

```html
<script>
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { useRealtimeList } from 'pocketto-svelte';
  import { SalesInvoice } from '../../models/SalesInvoice.p';

  let salesInvoices = [] as SalesInvoice[];
  const subscriber = useRealtimeList(SalesInvoice);
  const unsubscribe = subscriber.subscribe((value) => (salesInvoices = value));
  onDestroy(unsubscribe);
</script>

{#each salesInvoices as invoice}
  <div on:click={() => goto(`/invoices/${invoice.id}`)}>
    <h1>{invoice.number}</h1>
  </div>
{/each}
```

### useRealtimeList - Configuration

There is also options that you can pass to `useRealtimeList()`:

- animationDelay: Delay in milliseconds to wait your custom animation done. Default: `1ms`.
- condition: A [query builder](/docs/data-modelling/query-builder#complex-queries---callback) condition to filter and sorting the data.
- onItemChange: Callback when the item is changed. After the `animationDelay` is done, it will emit `undefined`.
- onItemCreate: Callback when the item is created. After the `animationDelay` is done, it will emit `undefined`.
- onItemUpdate: Callback when the item is updated. After the `animationDelay` is done, it will emit `undefined`.

Example:

```html
<script>
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { useRealtimeList } from 'pocketto-svelte';
  import { SalesInvoice } from '../../models/SalesInvoice.p';

  let salesInvoices = [] as SalesInvoice[];
  const subscriber = useRealtimeList(SalesInvoice, {
    animationDelay: 2000,
    condition: (query) => query.where('status', 'draft').orderBy('date', 'desc'),
    onItemChange: (item) => console.log('Item changed', item),
    onItemCreate: (item) => console.log('Item created', item),
    onItemUpdate: (item) => console.log('Item updated', item),
  });
  const unsubscribe = subscriber.subscribe((value) => (salesInvoices = value));
  onDestroy(unsubscribe);
</script>
```

### useRealtime

By using `useRealtime()` hook, it will auto reflected to other similar page that have same model id.

```html
<script>
  import { onDestroy } from 'svelte';
  import { useParams } from 'svelte-routing';
  import { useRealtime } from 'pocketto-svelte';
  import { SalesInvoice } from '../../models/SalesInvoice.p';

  let invoice: SalesInvoice;
  const { id } = useParams();
  const subscriber = useRealtime(SalesInvoice, id);
  const unsubscribe = subscriber.subscribe((value) => (invoice = value));
  onDestroy(unsubscribe);
</script>

<div>
  <h1>{invoice?.number}</h1>

  <input type="text" bind:value={invoice.number} />

  {/* trigger save to submit to the database */}
  <button on:click={() => invoice.save()}>Save</button>
</div>
```
