const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD;
const dbName = 'shoes-master';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let categoriesdb = null;
let carddb = null;
let ownerdb = null;
let sizedb = null;
let seasondb = null;
let locationdb = null;
let typedb = null;


async function connect() {
    // run().catch(console.dir);
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(dbName).command({ ping: 1 });

        categoriesdb = client.db(dbName).collection("categories");
        carddb = client.db(dbName).collection("cards");
        ownerdb = client.db(dbName).collection("owner");
        sizedb = client.db(dbName).collection("size");
        seasondb = client.db(dbName).collection("season");
        locationdb = client.db(dbName).collection("location");
        typedb = client.db(dbName).collection("type");

    } catch (error) {
        console.log('Connection Error', error);
    }
}


/*async function close() {
    await client.close();
}*/


// Поиск в БД
async function find(collectionName, dbObj) {
    const collection = await getCollection(collectionName);
    return await collection.find(dbObj).toArray();
}

// Поиск в БД одного элемента
async function findOne(collectionName, dbObj) {
    const collection = await getCollection(collectionName);
    return await collection.findOne(dbObj);
}

// Поиск в БД и обновление одного элемента
async function findOneAndUpdate(collectionName, dbObj, dbData) {
    const collection = await getCollection(collectionName);

    // return await collection.findOneAndUpdate(dbObj, {$set: dbData});
    return await collection.findOneAndUpdate(dbObj, {$set: dbData}, { returnDocument: "after" });
}

// Вставка одного элемента
async function insertOne(collectionName, dbObj) {
    const collection = await getCollection(collectionName);

    return await collection.insertOne(dbObj);
}

//
async function deleteOne(collectionName, dbObj) {
    const collection = await getCollection(collectionName);

    return await collection.deleteOne(dbObj);
}


// Возвращает Коллекцию по ее названию
async function getCollection(collectionName) {
    if (!carddb) {
        await connect();
    }

    if (collectionName === 'cards') {
        return carddb;
    } else if (collectionName === 'owner') {
        return ownerdb;
    } else if (collectionName === 'size') {
        return sizedb;
    } else if (collectionName === 'season') {
        return seasondb;
    } else if (collectionName === 'location') {
        return locationdb;
    } else if (collectionName === 'type') {
        return typedb;
    } else {
        return categoriesdb;
    }
}

module.exports = {
    find,
    findOne,
    findOneAndUpdate,
    insertOne,
    deleteOne
}