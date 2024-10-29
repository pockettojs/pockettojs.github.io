---
sidebar_label: 'Bun + Elysia.js'
title: 'Bun + Elysia.js'
sidebar_position: 2
---

:::info
Please make sure you have go through the [Environment Setup](/docs/environment-setup) before you proceed with the installation.
:::

### Prerequisites

:::tip
We are using MongoDB as the database for this project. You can use any database you prefer.
:::

Before you start setting up your environment, make sure you have the following installed:

- [Bun](https://bun.sh), a superfast and new javascript runtime, natively support typescript.
- [MongoDB](https://www.mongodb.com/try/download/community), a NoSQL database that popular by using MERN stack.

### Installation

Start by creating a new project using Bun CLI.

```bash
bun create elysia my-bun-app
cd my-bun-app
```

Next, install the required dependencies. And install the MongoDB driver, and pocketto dependencies.

```bash
bun install
bun add mongoose pocketto
```

### Configuration

Make sure you are setup your CouchDB to support [couch_peruser](https://docs.couchdb.org/en/stable/config/couch-peruser.html), so the database will automatically create a new database for each user created.

### Usage

To start, create a file `src/models/master/Database.ts` and add the following code:

Add the dependencies file from below:

- `src/utils/couchdb.ts`, [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/utils/couchdb.ts)
- `src/utils/database.ts`, [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/utils/database.ts)

```typescript title="src/models/master/Database.ts"
import * as mongoose from 'mongoose';
import initiateCouchDB from '../../utils/couchdb';
import createUser, { connectSlaveDb } from '../../utils/database';
import Company from './Company';

export type Database = {
    name: string;
    protocol: string;
    databasableType: string;
    databasableId: mongoose.Types.ObjectId;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    encryption: boolean;
    encryptionPassword: string;
};

const DatabaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    protocol: {
        type: String,
        default: 'http',
    },
    databasableType: {
        type: String,
        required: true,
    },
    databasableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    host: {
        type: String,
        required: true,
    },
    port: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    database: {
        type: String,
        required: true,
    },
    encryption: {
        type: Boolean,
        default: false,
    },
    encryptionPassword: {
        type: String,
    },
}, {
    statics: {
        async checkDatabaseAccess(databaseId: string, userId: string, set) {
            const database = await this.findOne({ _id: databaseId });
            if (!database) return;
            if (database.databasableType === 'User' && database.databasableId.toString() !== userId) {
                set.status = 403;
                return {
                    message: "Unauthorized",
                }
            }
            if (database.databasableType === 'Company') {
                const invalidAccess = await Company.checkCompanyAccess(database.databasableId.toString(), userId, set);
                if (invalidAccess) {
                    return invalidAccess;
                }
            }
        },
    },
    methods: {
        createUserAndDatabase: async function () {
            const host = Bun.env.COUCHDB_HOST as string;
            const auth = {
                username: Bun.env.COUCHDB_USERNAME as string,
                password: Bun.env.COUCHDB_PASSWORD as string,
            };
            await initiateCouchDB(host, auth);
            await createUser(host, this.username, this.password, auth);
        },
        async connect() {
            return connectSlaveDb(this.toJSON() as Database);
        },
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
});

export default mongoose.model('Database', DatabaseSchema);
```

You can now bind the database into any master model you want to use. For example, you can bind the database into the `Company` or `User` master model.

- `src/models/master/Company.ts`, [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/models/master/Company.ts)
- `src/models/master/User.ts`, [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/models/master/User.ts)

Also, in this example, we are using the `SalesInvoice` and `Guide` slave model.

- `src/models/slave/SalesInvoice.p.ts`, [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/models/slave/SalesInvoice.p.ts)
- `src/models/slave/Guide.p.ts`, [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/models/slave/Guide.p.ts)

Then, you can expose the API for the database model.
Example from [here](https://github.com/pockettojs/pocketto-bun-example/blob/master/src/modules/DatabaseModule.ts)

```typescript title="src/modules/DatabaseModule.ts"
import { ProtectedApp } from "..";
import createUser, { connectMasterDb, usernameToDbName } from "../utils/database";
import Database from "../models/master/Database";
import { t } from "elysia";
import mongoose from "mongoose";
import initiateCouchDB from "../utils/couchdb";
import shortUuid from 'short-uuid';
import { SalesInvoice } from "../models/slave/SalesInvoice.p";
import { Guide } from "../models/slave/Guide.p";
import { Model } from "pocketto";
import { ModelStatic } from "pocketto/dist/src/definitions/Model";

enum DatabasableType {
    User = "User",
    Company = "Company",
};

const List = (app: ProtectedApp) => {
    return app.get(
        "/",
        async ({ userId }) => {
            await connectMasterDb();
            const databases = await Database.find({ databasableId: userId });
            return {
                message: "Databases retrieved successfully",
                data: databases.map((database) => database.toJSON()),
            };
        },
    );
}

const Read = (app: ProtectedApp) => {
    return app.get(
        "/:databaseId",
        async ({ set, userId, params: { databaseId } }) => {
            await connectMasterDb();
            const database = await Database.findOne({ _id: databaseId });
            if (!database) {
                set.status = 404;
                return {
                    message: "Database not found",
                };
            }

            const invalidAccess = await Database.checkDatabaseAccess(databaseId, userId, set);
            if (invalidAccess) {
                return invalidAccess;
            }

            return {
                message: "Database retrieved successfully",
                data: database.toJSON(),
            };
        },
    );
}

const Create = (app: ProtectedApp) => {
    return app.post(
        "/",
        async ({ body, userId }) => {
            await connectMasterDb();
            const username = String(shortUuid.generate());
            const password = String(shortUuid.generate());
            const databaseName = usernameToDbName(username);

            const database = new Database();
            database.databasableType = body.databasableType || "User";
            database.databasableId = new mongoose.Types.ObjectId(body.databasableId || userId);
            database.name = `${database.databasableType}-${database.databasableId}`;
            database.protocol = Bun.env.COUCHDB_PROTOCOL as string;
            database.host = Bun.env.COUCHDB_HOST as string;
            database.port = Number(Bun.env.COUCHDB_PORT);
            database.username = username;
            database.password = password;
            database.database = databaseName;
            database.encryption = body.encryption || false;
            database.encryptionPassword = body.encryptionPassword || "";
            await database.save();

            const host = Bun.env.COUCHDB_HOST as string;
            const auth = {
                username: Bun.env.COUCHDB_USERNAME as string,
                password: Bun.env.COUCHDB_PASSWORD as string,
            };
            await initiateCouchDB(host, auth);
            const url = `${database.protocol}://${database.host}:${database.port}`;
            await createUser(url, database.username, database.password, auth);
            await new Promise((resolve) => setTimeout(resolve, 50));

            return {
                message: "Database created successfully",
                data: database.toJSON(),
            };
        },
    );
}

const ReadDocuments = (app: ProtectedApp) => {
    return app.get(
        "/:databaseId/collections/:collectionName/documents",
        async ({ set, userId, params: { databaseId, collectionName } }) => {
            await connectMasterDb();
            const database = await Database.findOne({ _id: databaseId });
            if (!database) {
                set.status = 404;
                return {
                    message: "Database not found",
                };
            }

            const invalidAccess = await Database.checkDatabaseAccess(databaseId, userId, set);
            if (invalidAccess) {
                return invalidAccess;
            }

            const collectionMapper = {
                [SalesInvoice.collectionName]: SalesInvoice,
                [Guide.collectionName]: Guide,
            } as { [key: string]: ModelStatic<Model> };

            if (!collectionMapper[collectionName]) {
                set.status = 404;
                return {
                    message: "Collection not found",
                };
            }

            await database.connect();
            const DestinationModel = collectionMapper[collectionName];
            const databaseName = database.name;
            const result = await (new DestinationModel()).getClass().via(databaseName).get();
            return {
                message: "Collection list retrieved successfully",
                data: result,
            };
        },
    );
}

const ReadDocument = (app: ProtectedApp) => {
    return app.get(
        "/:databaseId/collections/:collectionName/documents/:documentId",
        async ({ set, userId, params: { databaseId, collectionName, documentId } }) => {
            await connectMasterDb();
            const database = await Database.findOne({ _id: databaseId });
            if (!database) {
                set.status = 404;
                return {
                    message: "Database not found",
                };
            }

            const invalidAccess = await Database.checkDatabaseAccess(databaseId, userId, set);
            if (invalidAccess) {
                return invalidAccess;
            }

            const collectionMapper = {
                [SalesInvoice.collectionName]: SalesInvoice,
                [Guide.collectionName]: Guide,
            } as { [key: string]: ModelStatic<Model> };

            if (!collectionMapper[collectionName]) {
                set.status = 404;
                return {
                    message: "Collection not found",
                };
            }

            await database.connect();
            const DestinationModel = collectionMapper[collectionName];
            const databaseName = database.name;
            const result = await (new DestinationModel()).getClass().via(databaseName).find(documentId);
            if (!result) {
                set.status = 404;
                return {
                    message: "Document not found",
                };
            }
            return {
                message: "Document retrieved successfully",
                data: result,
            };
        },
    );
}

const CreateDocument = (app: ProtectedApp) => {
    return app.post(
        "/:databaseId/collections/:collectionName/documents",
        async ({ set, userId, params: { databaseId, collectionName }, body }) => {
            await connectMasterDb();
            const database = await Database.findOne({ _id: databaseId });
            if (!database) {
                set.status = 404;
                return {
                    message: "Database not found",
                };
            }

            const invalidAccess = await Database.checkDatabaseAccess(databaseId, userId, set);
            if (invalidAccess) {
                return invalidAccess;
            }

            const collectionMapper = {
                [SalesInvoice.collectionName]: SalesInvoice,
                [Guide.collectionName]: Guide,
            } as { [key: string]: ModelStatic<Model> };

            if (!collectionMapper[collectionName]) {
                set.status = 404;
                return {
                    message: "Collection not found",
                };
            }

            await database.connect();
            const DestinationModel = collectionMapper[collectionName];
            const databaseName = database.name;
            const createResult = await (new DestinationModel()).getClass().via(databaseName).create(body);
            const result = await (new DestinationModel()).getClass().via(databaseName).find(createResult._id);
            return {
                message: "Document created successfully",
                data: result,
            };
        },
    );
}

const UpdateDocument = (app: ProtectedApp) => {
    return app.put(
        "/:databaseId/collections/:collectionName/documents/:documentId",
        async ({ set, userId, params: { databaseId, collectionName, documentId }, body }) => {
            await connectMasterDb();
            const database = await Database.findOne({ _id: databaseId });
            if (!database) {
                set.status = 404;
                return {
                    message: "Database not found",
                };
            }

            const invalidAccess = await Database.checkDatabaseAccess(databaseId, userId, set);
            if (invalidAccess) {
                return invalidAccess;
            }

            const collectionMapper = {
                [SalesInvoice.collectionName]: SalesInvoice,
                [Guide.collectionName]: Guide,
            } as { [key: string]: ModelStatic<Model> };

            if (!collectionMapper[collectionName]) {
                set.status = 404;
                return {
                    message: "Collection not found",
                };
            }

            await database.connect();
            const DestinationModel = collectionMapper[collectionName];
            const databaseName = database.name;
            const result = await (new DestinationModel()).getClass().via(databaseName).find(documentId);
            if (!result) {
                set.status = 404;
                return {
                    message: "Document not found",
                };
            }
            result.fill(body);
            result.getClass().dbName = databaseName;
            await result.save();
            return {
                message: "Document updated successfully",
                data: result,
            };
        },
    );
}

export default {
    List,
    Read,
    Create,
    ReadDocuments,
    ReadDocument,
    CreateDocument,
    UpdateDocument,
};
```

And then, we can expose these API to the server.

```typescript title="src/index.ts"
const app = new Elysia()
    .group("/databases", (group) => group
        .use(DatabaseModule.List)
        .use(DatabaseModule.Read)
        .use(DatabaseModule.Create)
        .use(DatabaseModule.ReadDocuments)
        .use(DatabaseModule.ReadDocument)
        .use(DatabaseModule.CreateDocument)
        .use(DatabaseModule.UpdateDocument)
    );

app.listen(3000);
console.log("Server started at http://localhost:3000");
```

You can now start the server by running the following command:

```bash
bun dev
```

It will output the following:

```bash
Server started at http://localhost:3000
```
