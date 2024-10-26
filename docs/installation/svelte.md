---
sidebar_label: 'Svelte'
title: 'Svelte'
sidebar_position: 4
---

:::info
Please make sure you have go through the [Environment Setup](/docs/environment-setup) before you proceed with the installation.
:::

### Installation

To use Pocketto in a Svelte project, you need to install the `pocketto` and `pocketto-svelte` package. Also, need to install `patch-package` to patch the `pouchdb-browser` to fix package.

```bash
npm install pocketto pocketto-svelte patch-package
```

After installing the package, you need to patch the `pouchdb-browser` package. You can do this by running the following command.

```bash
mkdir patches
cp node_modules/pocketto-svelte/patches/pouchdb-browser+8.0.1.patch patches/
```

Add the following script to your `package.json` file.

```json title="package.json"
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

Then, run the following command to patch the `pouchdb-browser` package.

```bash
npm install
```

:::warning
You might facing issue when install the package. In this case, [please refer to this solution](/docs/environment-setup#debug-for-npmyarn-install).
:::

### Using Vite

If you are using vite, make sure you have enable global and decorators in `vite.config.ts` file.

```ts title="vite.config.ts"
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    global: {},
  },
});
```

Disable the `ssr` in the `+layout.ts` file.

```ts title="src/+layout.ts"
export const ssr = false;
```

### Usage

You can connect to a database via the `DatabaseManager.connect()` function. <br />
Also, you need to set the environment to `browser`. <br />
You can also set the id method to `timestamp` which is optional. [All available id method](/docs/data-modelling/id) in here.

```ts title="src/+layout.svelte"
<script lang="ts">
 import Header from './Header.svelte';
 import '../app.css';
 let { children } = $props();
 import { DatabaseManager, p } from 'pocketto';

 p.setEnvironment('browser');
 p.setIdMethod('timestamp');
 DatabaseManager.connect('default', {
  dbName: 'default',
  adapter: 'idb'
 }).then(async (localDb) => {
    p.setRealtime(true);
 });
</script>

<div class="app">
 <Header />

 <main>
  {@render children()}
 </main>

 <footer>
  <p>
   visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
  </p>
 </footer>
</div>

<style>
 .app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
 }

 main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  box-sizing: border-box;
 }

 footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
 }

 footer a {
  font-weight: bold;
 }

 @media (min-width: 480px) {
  footer {
   padding: 12px 0;
  }
 }
</style>
```
