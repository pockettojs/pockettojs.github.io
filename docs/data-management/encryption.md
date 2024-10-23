---
sidebar_label: 'Data Encryption'
title: 'Data Encryption'
sidebar_position: 3
---

:::danger Performance Issue Acknowledgement
By enable encryption, your data querying and sorting will be slower around 3-10x. Depends on the documents you stored.

This is due to the encrypted data cannot be queried directly. The data need to be decrypted first before it can be queried.

Please consider this before enabling the encryption feature. If you have a lot of data and need to query it frequently, you may consider not to enable the encryption feature.

<!-- In the next major release, we will improve via indexing all the foreign key and primary key so that the data can be queried faster. -->
:::

### Introduction

The `encrypt` method is used to encrypt the data before storing it in the database. The framework uses the `libsodium-wrappers` library to encrypt the data.

```ts
import { DatabaseManager } from 'pocketto';

DatabaseManager.connect('default', {
    encryption: true,
    encryptionPassword: '12345',
    silentConnect: false,
    dbName: 'default',
    adapter: 'idb',
});
```

All the data will be encrypted into `payload` field, so people will not be able to read the data directly from the database.

![Encrypted Data](encrypted-data.png)
