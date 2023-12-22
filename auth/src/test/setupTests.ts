// setupTests.ts
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
let mongo: any;

declare global {
  function signIn(): Promise<string[]>;
}

const setupDB = async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
};

const teardownDB = async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
};

const clearDatabase = async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
};

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  await teardownDB();
});

beforeEach(async () => {
  await clearDatabase();
});

global.signIn = async () => {
  const email = "ayomikuolatunji@gmail.com";
  const password = "123456789";
  const res = await request(app).post("/api/users/signUp").send({ email, password }).expect(201);
  const cookie = res.get("Set-Cookie");
  return cookie;
};
