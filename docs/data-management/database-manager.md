---
sidebar_label: Database Manager
title: Database Manager
sidebar_position: 1
---

### Introduction

The `DatabaseManager` is a class that provides a set of methods to interact with the database. It is responsible for creating, updating, and deleting records in the database.

```ts
import { DatabaseManager } from 'pocketto';

DatabaseManager.connect('default', {
    encryption: false,
    silentConnect: false,
    dbName: 'default',
    adapter: 'memory',
    auth: {
        username: 'admin',
        password: 'password'
    },
});
```

### Slient Connect

By default, when connected to the database, it will show a message in the console.

![Slient Connect](slient-connect.png)

You can disable this message by setting the `silentConnect` option to `true`.

```ts
DatabaseManager.connect('default', {
    silentConnect: true,
});
```
![Slient Connect Enabled](slient-connect-enable.png)

### Database Name

You can specify the name of the database by setting the `dbName` option.

```ts
DatabaseManager.connect('default', {
    dbName: 'my-database',
});
```

Then, you can use `DatabaseManager.get()` to get the database instance.

```ts
const db = DatabaseManager.get('my-database');
```

### Authentication

You can specify the username and password to authenticate with the remote server.

```ts
DatabaseManager.connect('http://localhost:5984', {
    dbName: 'remote-database',
    adapter: 'http',
    auth: {
        username: 'admin',
        password: 'password'
    },
});
```

### Adapters

The `DatabaseManager` uses adapters to interact with the database including:
- `memory`: An adapter to store data in memory.
- `idb`: An adapter to store data in IndexedDB.
- `leveldb`: An adapter to store data in LevelDB.
- `websql`: An adapter to store data in WebSQL.
- `http`: An adapter to store data in a remote server.

### React Native Adapters
- `react-native-sqlite`: An adapter to store data in SQLite database in React Native.

### Encryption
For more information on how to encrypt data, see [Data Encryption](encryption.md).