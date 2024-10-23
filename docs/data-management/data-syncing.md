---
sidebar_label: 'Data Syncing'
title: 'Data Syncing'
sidebar_position: 2
---

### Introduction

The `syncDatabases` method is used to synchronize the local database with the remote database. This method will fetch the data from the remote database and update the local database.

:::info Assumption
This tutorial is assumed that you have already connected to a local database via [this tutorial](./database-manager.md).
:::

```ts
import { DatabaseManager, syncDatabases } from 'pocketto';

async function syncWithRemote() {
  const db = DatabaseManager.get('my-database');

  const remoteDb = await DatabaseManager.connect('http://localhost:5984', {
    dbName: 'remote-database',
    adapter: 'http',
    auth: {
      username: 'admin',
      password: 'password'
    },
  });
  syncDatabases(remoteDb.config.dbName, localDb.config.dbName);
  await new Promise((resolve) => {
    remoteDb.sync(localDb, {
      live: false,
      retry: true,
      continuous: false,
    }).on("complete", () => {
      console.log("Your local database has been fully synced with your remote database!");
      resolve(true);
    });
  });
}
```