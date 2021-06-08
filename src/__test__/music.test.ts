import request from "supertest";
import app from "../app";
import axios from "axios";
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
let dataPrefilled: any;
let ID = "";

describe("POST/ signup and signin", () => {
  test("test for sig nup", async () => {
    const res = await request(app).post("/music/signUp").send({
      firstName: "aderemi",
      lastName: "amos",
      dateOfBirth: "1990-09-12",
      gender: "male",
      email: "aderemiamos@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User Created Successfully");
  });

  test("test for sign in", async () => {
    const res = await request(app).post("/music/signIn").send({
      email: "aderemiamos@gmail.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    const token = res.body.token;
    currentUser.token = token;
    expect(res.body.token).toBe(token);
  });
});

describe("GET all genres and genre", () => {
  test("get all genres", async () => {
    const fetch = await axios.get("https://api.deezer.com/genre");
    //console.log("fetch", fetch.data);
    const res = await request(app)
      .get("/music/genres")
      .set("Authorization", `Bearer ${currentUser.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("successful");
    //console.log(res);
    dataPrefilled = fetch.data.data[1];
    console.log("data prefilled", dataPrefilled);
  });

  test("get a genre by id", async () => {
    console.log("the Id", dataPrefilled.id);
    const res = await request(app)
      .get(`/music/genres/${dataPrefilled.id}`)
      .set("Authorization", `Bearer ${currentUser.token}`);

    console.log("res body", res.body);
    ID = res.body.data[0]._id;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Successful");
  });
  test("get playlist associated to a genre", async () => {
    const id = dataPrefilled.id;
    console.log("incoming ID", id);
    const res = await request(app)
      .get(`/genre/playlist/${id}`)
      .set("Authorization", `Bearer ${currentUser.token}`);
    console.log("Incoming Response", res);

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Playlist");
  });
});

// describe("GET playlist and artist", () => {
// });
