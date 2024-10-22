---
sidebar_position: 4
title: ID Generation
---

### Introduction

Pocketto provides a way to generate unique ids for your data. You can set the id method to generate unique ids.

### Set id Method
```ts
import { p } from 'pocketto';

p.setIdMethod('uuid');
```

Available id methods:
- `uuid` - Generates a unique id via uuidv7 which is sort by time.
- `shortid` - Generates a unique id using the `shortid` package.
- `timestamp` - Generates a unique id using the current timestamp. Format: `YYYYMMDDHHmmssSSS`
- 
- `custom` - Generates a unique id using the custom function you provide.