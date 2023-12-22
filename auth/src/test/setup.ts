import { MongoMemoryServer } from "mongodb-memory-server";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import { app } from "../app";

beforeAll(async () => {
  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri, <{}>{
    serverApi: ServerApiVersion.v1,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});
