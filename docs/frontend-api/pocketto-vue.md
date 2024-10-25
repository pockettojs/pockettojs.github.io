---
sidebar_label: 'Vue Composables'
title: 'Vue Composables'
sidebar_position: 3
---

## Vue Composables API

Pocketto provides a set of Vue composables to interact with the Pocketto model in Vue.

### useRealtimeList

By using `useRealtimeList()` composable, the listing will auto retrieve new model when there is new data.

```tsx
{/* <script setup lang="ts"> */}
import { SalesInvoice } from '@/models/SalesInvoice.p';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRealtimeList } from 'pocketto-vue';

const changedItem = ref<SalesInvoice>();
const salesInvoices = useRealtimeList(SalesInvoice, {
  animationDelay: 3000, 
  itemChange: (item) => {
    changedItem.value = item;
  },
});
const router = useRouter();

function navigateToInvoice(invoice: SalesInvoice) {
  router.push(`/invoices/${invoice.id}`);
}
{/* </script> */}

<template>
    <div>
        <div v-for="invoice in salesInvoices" :key="invoice.id" @click="navigateToInvoice(invoice)">
        <h1>{{ invoice.number }}</h1>
        </div>
    </div>
</template>
```

### useRealtimeList - Configuration

There is also options that you can pass to `useRealtimeList()`:

- animationDelay: Delay in milliseconds to wait your custom animation done. Default: `1ms`.
- condition: A [query builder](/docs/data-modelling/query-builder#complex-queries---callback) condition to filter and sorting the data.
- onItemChange: Callback when the item is changed. After the `animationDelay` is done, it will emit `undefined`.
- onItemCreate: Callback when the item is created. After the `animationDelay` is done, it will emit `undefined`.
- onItemUpdate: Callback when the item is updated. After the `animationDelay` is done, it will emit `undefined`.

Example:

```tsx
{/* <script setup lang="ts"> */}
import { SalesInvoice } from '@/models/SalesInvoice.p';
import { ref } from 'vue';
import { useRealtimeList } from 'pocketto-vue';

const changedItem = ref<SalesInvoice>();
const salesInvoices = useRealtimeList(SalesInvoice, {
  animationDelay: 3000, 
  condition: (query) => query.where('status', 'draft').orderBy('date', 'desc'),
  itemChange: (item) => {
    changedItem.value = item;
  },
});
{/* </script> */}
```

### useRealtime

By using `useRealtime()` hook, it will auto reflected to other similar page that have same model id.

```tsx
{/* <script setup lang="ts"> */}
import { SalesInvoice } from '@/models/SalesInvoice.p';
import { ref } from 'vue';
import { useRealtime } from 'pocketto-vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const invoice = useRealtime(SalesInvoice, id);

watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    invoice = useRealtime(SalesInvoice, newId as string);
  }
});
{/* </script> */}

<template>
    <div>
        <h1>{{ invoice.number }}</h1>

        <input v-model="invoice.number" />
        {/* trigger save to submit to the database */}
        <button @click="invoice.save()">Save</button>
    </div>
</template>
```
