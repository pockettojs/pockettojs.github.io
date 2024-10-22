---
sidebar_label: 'Vue'
title: 'Vue'
sidebar_position: 3
---

## Installation

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


## Using Vite

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

