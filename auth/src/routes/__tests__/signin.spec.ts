import request from "supertest";
import { app } from "../../app";
import "../../test/setupTests";

test("Fails when invalid email is provided", async () => {
  await request(app)
    .post("/api/users/signIn")
    .send({
      email: "ayomikuolatunji@gmail.com",
      password: "12345679",
    })
    .expect("Content-Type", /json/)
    .expect(404);
});

test("Successful signIn", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "ayomikuolatunji@gmail.com",
      password: "123456789",
    })
    .expect(201);

  const response = await request(app).post("/api/users/sign-in").send({
    email: "ayomikuolatunji@gmail.com",
    password: "123456789",
  });
  expect(response.body.email).toEqual("ayomikuolatunji@gmail.com");
  expect(response.get("Set-Cookie")).not.toBeDefined();
});

test("Wrong Password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "ayomikuolatunji@gmail.com",
      password: "123456789",
    })
    .expect("Content-Type", /json/)
    .expect(201);

  const response = await request(app)
    .post("/api/users/sign-in")
    .send({
      email: "ayomikuolatunji@gmail.com",
      password: "password123",
    })
    .expect("Content-Type", /json/)
    .expect(400);
});
