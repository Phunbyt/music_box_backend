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
  test("test for signup", async () => {
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
    const res = await request(app)
      .get("/music/genres")
      .set("Authorization", `Bearer ${currentUser.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("successful");

    dataPrefilled = fetch.data.data[1];
  });

  test("get a genre by id", async () => {
    const res = await request(app)
      .get(`/music/genres/${dataPrefilled.id}`)
      .set("Authorization", `Bearer ${currentUser.token}`);
    ID = res.body.data[0]._id;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Successful");
  });
});

describe("Test for playlist creation", () => {
  test("User should be able to create a playlist", async () => {
    const playlist: any = {
      name: "The beatles",
      category: "public",
      songs: [],
      genre: "Rock",
    };

    const res = await request(app)
      .post("/playlist/create")
      .send(playlist)
      .set("Authorization", `Bearer ${currentUser.token}`);
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    dataPrefilled = res.body.data;
    console.log("RESPONSE", res.body.data);
    
  });
});
describe("GET playlist and artist", () => {
  test("get artist associated to a genre", async () => {
    const ID = dataPrefilled.id;
    const res = await request(app)
      .get(`/genre/artist/${ID}`)
      .set("Authorization", `Bearer ${currentUser.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Artist Genre");
  });
});
