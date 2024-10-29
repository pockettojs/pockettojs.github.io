---
sidebar_label: 'Environment Setup'
title: 'Environment Setup'
sidebar_position: 2
---

### Introduction

Before you start using Pocketto, you need to set up your environment. This guide will help you set up your environment to start using Pocketto.

### Prerequisites

Before you start setting up your environment, make sure you have the following installed:

- [CouchDB](https://couchdb.apache.org/#download), a real-time NoSQL database that allows you to store your data in local as well as in the cloud.
- [Node.js](https://nodejs.org/en/download/), version 14 or above is recommended.
- [python](https://www.python.org/downloads/). In order to build native modules of npm modules: leveldown, sqlite3, etc.
- [node-gyp](https://github.com/nodejs/node-gyp)

### Platform Installation

Depending on your project platform, you can pick one of the following installation methods:

- [React](/docs/installation/frontend/react)
- [React Native](/docs/installation/frontend/react-native)
- [Vue.js](/docs/installation/frontend/vue)
<!-- - [Node.js](node) -->
<!-- - [Bun](bun) -->

### Debug for npm/yarn install

If you found the issue for the python dependencies problem `ModuleNotFoundError: No module named 'distutils'`, you can try the following

1. Install python 3.8 or above
2. Install the `distutils` package by running the following command:

```bash
python -m venv venv
source venv/bin/activate
pip install distutils
```

3. Install node-gyp globally by running the following command:

```bash
npm install -g node-gyp
```

You can now proceed with the installation of Pocketto in your project.
