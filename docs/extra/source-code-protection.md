---
sidebar_position: 1
title: Source Code Protection
---

### Introduction

This is a tutorial to guide you how to protect your source code to prevent reverse engineering.

:::info Assumption
This tutorial is assumed that you source code are all in `src` folder, an you have a `index.ts` file in the root directory of your project.

If you have a different structure, you can modify the `tsconfig.json` file to match your project structure.
:::

### Obfuscation

Obfuscation is a technique to make your code unreadable to humans. It is a way to protect your code from reverse engineering. There are many tools available to obfuscate your code.

In this tutorial, we will use the `javascript-obfuscator` package to obfuscate our code.

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
    "obstructor:node": "ncp dist obfuscated && javascript-obfuscator dist --compact true --target node --output obfuscated",
    "obstructor:browser": "ncp dist obfuscated && javascript-obfuscator dist --compact true --target browser --output obfuscated",
  }
}
```

You can use the `obstructor:node` script to obfuscate your code for Node.js and the `obstructor:browser` script to obfuscate your code for the browser.

To compile your code into a node module, [follow this tutorial](/docs/extra/create-a-node-module.md).
