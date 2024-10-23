---
sidebar_label: 'React Native Hooks'
title: 'React Native Hooks'
sidebar_position: 2
---

## React Hooks API

Pocketto provides a set of React hooks to interact with the Pocketto model in React Native.

### useRealtimeList

By using `useRealtimeList()` hook, the listing will auto retrieve new model when there is new data.

```tsx
import React, { useEffect } from 'react';
import { Pressable, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRealtimeList } from 'pocketto-react';
import { SalesInvoice } from 'src/models/SalesInvoice.p';

export function SalesInvoiceList({
  navigation,
}: {
  navigation: NativeStackScreenProps<any>['navigation'];
}) {
  const invoices = useRealtimeList(SalesInvoice);
  
  return <View>
    {invoices.map((invoice) => {
      const onPress = () => {
        navigation.navigate('SalesInvoicePage', { id: invoice.id });
      };

      return <Pressable key={invoice.id} onPress={onPress}>
        <Text>{invoice.number}</Text>
      </Pressable>;
    })}
  </View>;
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
export function SalesInvoiceList({
  navigation,
}: {
  navigation: NativeStackScreenProps<any>['navigation'];
}) {
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

By using `useRealtime()` hook, it will auto reflected the data that have same model id in other opened screen.

```tsx
import React, { useEffect } from 'react';
import { Pressable, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRealtime } from 'pocketto-react';
import { SalesInvoice } from 'src/models/SalesInvoice.p';

export function SalesInvoicePage({
  navigation,
}: {
  navigation: NativeStackScreenProps<any>['navigation'];
}) {
  const route = useRoute();
  const { id } = route.params;
  const [invoice, setInvoice] = useRealtime(SalesInvoice, id);

  return <View>
    <Text>{invoice?.number}</Text>

    <TextInput value={invoice?.number} onTextChange={(value) => {
        setInvoice({ ...invoice, number: value });
    }} />

    {/* trigger save to submit to the database */}
    <Pressable onPress={() => invoice.save()}>Save</Pressable>
  </View>;
}
```

You can use the `useEffect` to listen if the `model._meta._rev` is changed, so you can show some message to user that the data is updated.

```tsx
export function SalesInvoicePage({
  navigation,
}: {
  navigation: NativeStackScreenProps<any>['navigation'];
}) {
  const [invoice, setInvoice] = useRealtime(SalesInvoice, id);

  const [rev, setRev] = useState('');
  useEffect(() => {
    if (invoice._meta._rev !== rev && rev && invoice._meta._rev) {
      console.log('Data updated');
    } else {
      setRev(invoice._meta._rev);
    }
  }, [invoice._meta._rev, rev]);
}
```
