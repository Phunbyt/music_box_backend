import { dbConnect, dbDisconnect } from "../db/mongoMemoryServer";
import { AlbumInterface } from '../interfaces/albumInterface';
import request from "supertest";
import app from "../app";



let token;
let albumId: string = "";
let albumPrefilled: AlbumInterface | {} = {};
const currentUser: Record<string, string> = {};



beforeAll(async () => {
    await dbConnect();
});

afterAll(async () => {
    await dbDisconnect()
});


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
    token = res.body.token;
    currentUser.token = token;
    expect(res.body.token).toBe(token);
  });
});


describe("Find and create data / Update data", () => {
    it("successfully searches for an album", async () => {
      const queryParams = "twice as tall";
      const result = await request(app)
        .post(`/album?q=${queryParams}`)
        .set("authorization", `Bearer ${token}`);
      expect(result.status).toEqual(200);
      expect(result.body.message).toEqual(
        " Data successfully created" || "Data already in the database"
      );
      albumId = result.body.info[0]._id;
    });
});

describe("", () => {
    it("user successfully likes an album", async () => {
      const result = await request(app)
        .put(`/album/like/${albumId}`)
        .set("authorization", `Bearer ${token}`);
      expect(result.status).toEqual(200);
      expect(result.body.data.likeCount).toBe(1);
    });

  it("user successfully listens to song in an album", async () => {
    const result = await request(app)
      .put(`/album/listened/${albumId}`)
      .set("authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(result.body.data.listeningCount).toBe(1);
  });
});