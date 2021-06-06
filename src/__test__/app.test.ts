import { dataproc } from "googleapis/build/src/apis/dataproc";
import request from "supertest";
import app from "../app";
jest.setTimeout(60000);
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
let iden:any;
let dataPreFilled:any;
const currentUser: Record<string, any> = {};
describe("POST/ signup and signin", () => {
 test("test for sign up", async () => {
  const user = {
   firstName: "aderemi",
   lastName: "amos",
   dateOfBirth: "1990-09-12",
   gender: "male",
   email: "aderemiamos@gmail.com",
   password: "12345678",
   confirmPassword: "12345678",
  }
  const res = await request(app).post("/music/signUp").send(user);

  currentUser.ID = res.body.user._id
  currentUser.email = res.body.user.email
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
 });
});

describe('Test for playlist creation', ()=>{
  test('User should be able to create a playlist', async ()=>{
    const playlist:any = {
      name:"The beatles",
      category:"public",
      songs:[],
      genre:"Rock"
    }
    
    const res = await request(app)
                      .post('/playlist/create')
                      .send(playlist)
                      .set('Authorization', `Bearer ${currentUser.token}`);
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    dataPreFilled = res.body.data
    console.log(res.body.data)
    console.log(currentUser)
    //id = res.body.data._id;
  })
  test('User should be able to get all playlists', async()=>{
    const res = await request(app)
                      .get("/playlists")
                      .set("Authorization", `Bearer ${currentUser.token}`);
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.status).toBe('success')
    iden = res.body.data._id
  })

  test('User should be able to get a playlist', async()=>{
    const res = await request(app)
        .get(`/playlist/get/${dataPreFilled._id}`)
        .set('Authorization', `Bearer ${currentUser.token}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success"); 

  })

  test('User should be able to delete a playlist', async()=>{
    console.log(currentUser, dataPreFilled);
    
     const res = await request(app)
      .delete(`/playlist/removeplaylist/${dataPreFilled._id}`)
      .set("Authorization", `Bearer ${currentUser.token}`);
      if(currentUser.ID ==dataPreFilled.owner){
        expect(res.status).toBe(200);
      }else {
        expect(res.status).toBe(403)
      }
      
  })

})

describe('Activities in the playlist', ()=>{
  test('User should be able to add song to playlist', async ()=>{
    const newSong = {title: 'A new song'}
    const res = await request(app)
     .post(`/playlist/addsongs/${dataPreFilled._id}`)
     .send(newSong)
     .set("Authorization", `Bearer ${currentUser.token}`);
    expect(res.status).toBe(201)
  })

  
  test("User should be able to delete song from playlist", async () => {
    await request(app)
     .post(`/playlist/addsongs/${dataPreFilled._id}`)
     .send({title:'New Song'})
     .set("Authorization", `Bearer ${currentUser.token}`);
   const res = await request(app)
    .delete(`/playlist/removesong/${dataPreFilled._id}`)
    .send({title:'New Song'})
    .set("Authorization", `Bearer ${currentUser.token}`);
   expect(res.status).toBe(200);
  });

  test('User should be able to delete all songs from playlist', async ()=>{
    const res = await request(app).delete(`/playlist/removeallsongs/${dataPreFilled._id}`)
                                  .set('Authorization', `Bearer ${currentUser.token}`)
    expect(res.status).toBe(200)
  })
})