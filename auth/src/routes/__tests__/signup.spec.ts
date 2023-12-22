import request from "supertest";
import { app } from "../../app";
import "../../test/setupTests";

it("Should signup a new user with status of 201", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "ayomikuolatunji@gmail.com",
    password: "123456789",
  });
  expect(res.statusCode).toEqual(201);

  const res2 = await request(app).post("/api/users/signup").send({
    email: "ayomikuolatunji@gmail.com",
    password: "123456789",
  });
  expect(res2.statusCode).toEqual(403);
});

it("Return statusCode of 400 with invalid email", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "ayomikuolatunji@gmail.",
    password: "123456789",
  });
  expect(res.statusCode).toEqual(400);
});

it("Return status of 400 with invalid pass", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "ayomikuolatunji@gmail.com",
    password: "1",
  });
  expect(res.statusCode).toEqual(400);
});

it("Return status of 400 with empty payload", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "",
    password: "",
  });
  expect(res.statusCode).toEqual(400);
});

it("Set a cookie after a successful signup", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "ayomikuolatunji@gmail.com",
    password: "123456789",
  });
  expect(res.get("Set-Cookie")).not.toBeUndefined();
});
