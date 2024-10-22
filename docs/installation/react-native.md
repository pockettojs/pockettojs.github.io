---
sidebar_label: 'React Native'
title: 'React Native'
sidebar_position: 2
---

:::info
Please make sure you have go through the [Environment Setup](/docs/environment-setup) before you proceed with the installation.
:::

### Installation

To use Pocketto in a React project, you need to install the `pocketto` and `pocketto-react` package.

```bash
npm install pocketto pocketto-react
```

Also, to install native dependencies in order to let pocketto work properly, you need to install the following packages.

```bash
npm install -D @babel/plugin-proposal-decorators @babel/plugin-transform-class-static-block babel-plugin-module-resolver babel-plugin-transform-decorators-legacy rn-nodeify
npm install @tradle/react-native-http assert buffer https-browserify path-browserify process react-native-crypto react-native-get-random-values react-native-level-fs react-native-os react-native-randombytes react-native-sqlite-2 readable-stream stream-browserify url base-64 pouchdb-adapter-react-native-sqlite@3.0.1
```

Add `postinstall` script to your `package.json` file.

```json title="package.json"
{
  "scripts": {
    "postinstall": "rn-nodeify --install fs,process,url,assert,crypto,http,https,os,buffer,stream,path --hack"
  }
}
```

Add `shim.js` file to the root of your project.

```js title="shim.js"
import { shim } from 'react-native-quick-base64';
shim();

if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';
if (typeof process === 'undefined') {
    global.process = require('process');
} else {
    const bProcess = require('process');
    for (var p in bProcess) {
        if (!(p in process)) {
            process[p] = bProcess[p];
        }
    }
}

process.browser = false;
process.nextTick = setImmediate;
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;

const isDev = typeof __DEV__ === 'boolean' && __DEV__;
process.env['NODE_ENV'] = isDev ? 'development' : 'production';
if (typeof localStorage !== 'undefined') {
    localStorage.debug = isDev ? '*' : '';
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
// require('crypto')
```

Make sure you are enabled decorators in your project. If not, you can enable it by adding the following configuration to your `tsconfig.json` file.

```json title="tsconfig.json"
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### iOS Configuration

For iOS, make sure you are running pod install after installing the packages for native dependencies.

```bash
npx pod-install
```

### Usage

You can connect to a database via the `DatabaseManager.connect()` function. <br />
Also, you need to set the environment to `react-native`. <br />
You can also set the id method to `timestamp` which is optional. [All available id method](/docs/id) in here.

You also need to manually install the SQLite adapter for PouchDB.

```jsx title="index.js"
import { AppRegistry } from 'react-native';
import App from './App';

import 'react-native-get-random-values';
import PouchDB from 'pouchdb';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import SQLite from 'react-native-sqlite-2';
import { DatabaseManager, p } from "pocketto";

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
PouchDB.plugin(SQLiteAdapter);

p.setEnvironment("react-native");
p.setIdMethod('timestamp');
DatabaseManager.connect('default', {
  adapter: 'react-native-sqlite',
  dbName: 'default'
}).then((localDb) => {
  const remoteHost = Platform.OS === 'android' ? 'http://192.168.68.107:5984' : 'http://localhost:5984';
  p.setRealtime(true);
});

AppRegistry.registerComponent(appName, () => App);
```
