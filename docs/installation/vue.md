---
sidebar_label: 'Vue'
title: 'Vue'
sidebar_position: 3
---

:::info
Please make sure you have go through the [Environment Setup](/docs/environment-setup) before you proceed with the installation.
:::

### Installation

To use Pocketto in a Vue project, you need to install the `pocketto` package.

```bash
npm install pocketto
```

You also need to install the `pocketto-vue` in order to use the Vue Composables.

```bash
npm install pocketto-vue
```

Make sure you are enabled decorators in your project. If not, you can enable it by adding the following configuration to your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### Using Vite

If you are using vite, make sure you have enable global and decorators in `vite.config.ts` file.

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    global: {},
  },
})

```

### Usage

You can connect to a database via the `DatabaseManager.connect()` function. <br />
Also, you need to set the environment to `browser`. <br />
You can also set the id method to `timestamp` which is optional. [All available id method](/docs/id) in here.

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DatabaseManager, p } from 'pocketto'

p.setEnvironment('browser');
p.setIdMethod('timestamp');
DatabaseManager.connect('default', {
  dbName: 'default',
}).then(() => {
  p.setRealtime(true);
});

const app = createApp(App)
app.mount('#app')
```