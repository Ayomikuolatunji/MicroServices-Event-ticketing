import request from "supertest";
import { app } from "../../app";
import "../../test/setupTests";

test("Successful signOut", async () => {
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

  const signOutResponse = await request(app).post("/api/users/sign-out").send({});
  expect(signOutResponse.body.currentUser).toBe(undefined);
});
