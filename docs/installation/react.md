---
sidebar_label: 'React'
title: 'React'
sidebar_position: 1
---

## Installation

To use Pocketto in a React project, you need to install the `pocketto` and `pocketto-react` package.

```bash
npm install pocketto pocketto-react
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
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        [
          "@babel/plugin-proposal-class-properties",
          { loose: true },
        ],
      ],
    },
  })],
  define: {
    global: {},
  }
});
```

## Usage

<!-- In your `main.tsx` file, you need to wrap your application with the `PockettoProvider` component. -->
You can connect to a database via the `DatabaseManager.connect()` function. <br />
Also, you need to set the environment to `browser`. <br />
You can also set the id method to `timestamp` which is optional. [All available id method](/docs/id) in here.

```tsx
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DatabaseManager, p } from 'pocketto'

p.setEnvironment('browser');
p.setIdMethod('timestamp');
DatabaseManager.connect('default', {
    dbName: 'default',
}).then(async (localDb) => {
    p.setRealtime(true);
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
```