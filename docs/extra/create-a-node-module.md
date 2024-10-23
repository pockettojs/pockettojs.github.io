---
sidebar_position: 2
title: Create a Node Module
---

### Introduction

This is a tutorial to guide you on how to create a Node module. You can create a Node module to share your code with others or to reuse your code in different projects. Such as Node.js, Bun.js or React.js.

:::info
This tutorial is assumed that you source code are all in `src` folder, an you have a `index.ts` file in the root directory of your project.

If you have a different structure, you can modify the `tsconfig.json` file to match your project structure.
:::


### Steps

1. Install the following packages:

```bash
npm install -D typescript @types/node ts-node tsconfig-paths eslint eslint-config-airbnb-base eslint-plugin-import jasmine ncp javascript-obfuscator tsc-alias nyc
```

2. Add the following scripts to your `package.json` file:

```json title=package.json
{
  "name": "your-module-name",
  "main": "dist/src/index.js",
  "types": "dist/src/index.d.ts",
  "scripts": {
    "compile:type": "tsc --project tsconfig-node.json --declaration --declarationDir dist --emitDeclarationOnly && tsc-alias -p tsconfig-types.json",
    "compile:browser": "tsc --project tsconfig-browser.json && tsc-alias -p tsconfig-browser.json && rm -Rf dist/node/mocks && rm -Rf dist/node/spec && rm -Rf dist/node/debug",
    "compile:node": "tsc --project tsconfig-node.json && tsc-alias -p tsconfig.json && rm -Rf dist/browser/mocks && rm -Rf dist/browser/spec && rm -Rf dist/browser/debug",
    "build": "npm run compile:type && npm run compile:browser && npm run compile:node && npm pack",
  }
}
```

3. Create 3 files in the root directory of your project:

```json title="tsconfig-type.json"
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "src/*": [
        "./src/*"
      ]
    },
    "lib": [
      "ES2021"
    ],
    "outDir": "./dist",
    "sourceMap": true,
    "target": "ES2015",
    "module": "CommonJS",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "declaration": false,
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true
  },
  "include": [
    "src/",
    "index.ts",
    "**/*.tgz",
    "**/*.patch"
  ],
  "exclude": [
    "node_modules",
    "**/__tests__/*",
    "dist",
    "spec/",
    "mocks/",
  ]
}
```

```json title="tsconfig-node.json"
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "src/*": [
        "./src/*"
      ]
    },
    "lib": [
      "ES2021"
    ],
    "outDir": "./dist/node",
    "sourceMap": true,
    "target": "ES2015",
    "module": "CommonJS",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "declaration": false,
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true
  },
  "include": [
    "src/",
    "index.ts",
    "**/*.tgz",
    "**/*.patch"
  ],
  "exclude": [
    "node_modules",
    "**/__tests__/*",
    "dist",
    "mocks/",
    "spec/"
  ]
}
```

```json title="tsconfig-browser.json"
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "src/*": [
        "./src/*"
      ]
    },
    "lib": [
      "ES2021"
    ],
    "outDir": "./dist/browser",
    "sourceMap": true,
    "target": "ES2015",
    "module": "ES2015",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "declaration": false,
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true
  },
  "include": [
    "src/",
    "index.ts",
    "**/*.tgz",
    "**/*.patch"
  ],
  "exclude": [
    "node_modules",
    "**/__tests__/*",
    "dist",
    "spec/",
    "mocks/",
  ]
}
```

After complete the above steps, you can run the following command to build your module:

```bash
npm run build
```

Then you will get a `<your-module-name>.tgz` file in the root directory of your project. You can publish this file to npm, or share it with others.

Then run the following command in your destination project to install your module:

```bash
npm install <your-module-name>.tgz
```
