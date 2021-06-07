import request from "supertest";
import app from "../app";

import {
  testDbConnect,
  dbDisconnect,
} from "../config/database/mongodbMemoryServer";
beforeAll(async () => {
  await testDbConnect();
  console.log("beforeAll", "i am here");
});
afterAll(async () => {
  await dbDisconnect();
});


const currentUser: Record<string, string> = {};


describe("POST/ signup and signin", () => {
  test("test for sig nup", async () => {
    const res = await request(app).post("/music/signUp").send({
      firstName: "David",
      lastName: "Enoragbon",
      dateOfBirth: "20200-09-12",
      gender: "male",
      email: "maximdave@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User Created Successfully");
  });

  test("test for sign in", async () => {
    const res = await request(app).post("/music/signIn").send({
      email: "maximdave@gmail.com",
      password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    const token = res.body.token;
    expect(res.body.token).toBe(token);
  });
});

describe("test for search", () => {
  test("test for search for playlists, album, artist", async () => {
    const res = await request(app)
      .get("/music/search/?search=olamide")
      //.set("userAuthentication", `${currentUser.token}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("artist");
    expect(res.body.data).toHaveProperty("album");
    expect(res.body.data).toHaveProperty("playList");
  });
});
