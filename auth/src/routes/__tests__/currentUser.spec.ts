import request from "supertest";
import { app } from "../../app";
import "../../test/setupTests";

test("Get currently loggedIn user", async () => {
  const cookie = await global.signIn();
  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect("Content-Type", /json/)
    .expect(200);
  expect(response.body.currentUser.email).toEqual("ayomikuolatunji@gmail.com");
});

test("Get currentUer=null if not logged In", async function () {
  const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect("Content-Type", /json/)
    .expect(404);

  expect(response.body.currentUser).toEqual(undefined);
});
