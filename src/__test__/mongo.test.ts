import { dbConnect, dbDisconnect } from "../db/mongodb-memory-server";
import request from 'supertest';
import app from '../app';


let Usertoken: string;
let UserId: string;
let currentUser: Record<string, string> = {};

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
    Usertoken = res.body.token;
    currentUser.token = Usertoken;
    UserId = res.body.user._id;
    expect(res.body.token).toBe(Usertoken);
  });
});

describe('create artist, like artist and listen to artist', () => {
    test('create a new artist', async () => {
        const queryParams = 230;
        const res = await request(app)
            .post(`/artist/create/${queryParams}`)
            .set('authorization', `Bearer ${Usertoken}`);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('artistName');
        expect(typeof res.body === 'object').toBe(true);
        UserId = res.body._id;
    })

    test('update a artists like', async () => {
        const res = await request(app)
            .put(`/artist/like/${UserId}`)
            .set('authorization', `Bearer ${Usertoken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.info.likeCount).toBe(1);

    })

    test('update an artists listening count', async () => {
        const res = await request(app)
            .put(`/artist/listento/${UserId}`)
            .set('authorization', `Bearer ${Usertoken}`);
        expect(res.status).toBe(200);
        expect(res.body.artistInfo).toHaveProperty('listeningCount');
        expect(res.body.artistInfo.listeningCount).toBe(1);
        
    })
})