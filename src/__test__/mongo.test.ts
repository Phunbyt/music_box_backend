import { artist } from '../interfaces/artistinterface';
import request from 'supertest';
import app from '../app';

const artists: artist = {
    artistName: 'remi',
    artistId: '1234',
    artistLink: 'www.link/deezeer/on.com',
    artistPicture: 'afeewaf',
    pictureSmall: 'kaejae',
    pictureMedium: 'oefoa;ej',
    pictureBig: 'qwwewe',
    pictureXl: 'qweeryy',
    noOfAlbums: 123,
    noOfFan: 4577,
    radio: true,
    trackList: 'kafof',
    type: 'artist',
    liked: ['segun'],
    listened: ['remi'],
    likeCount: 0,
    listeningCount: 0
}

let ArtistId: string;
let Usertoken: string;
let UserId: string;
let artistFilled: artist | {} = {};
let currentUser: Record<string, string> = {};

// beforeAll(async () => {
//     await dbConnect();
// });
// afterAll(async () => {
//     await dbDisconnect()
// });

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
    expect(res.body.token).toBe(Usertoken);
  });
});

describe('create artist, like artist and listen to artist', () => {
    test('create a new artist', async () => {
        const res = await request(app)
            .post('/artist/create/:id')
            .set('authorization', `Bearer ${Usertoken}`);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('artist');
        expect(res.body.artist).toHaveProperty('artistName');
        expect(typeof res.body.artist === 'object').toBe(true);
        artistFilled = {
            ...res.body.artist
        };
    })

    test('update a artists like', async () => {
        artists.likeCount = 0;
        const res = await request(app)
            .put('/artist/like/:id')
            .set('authorization', `Bearer ${Usertoken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('likes');
        expect(res.body.likeCount).toBe(1);
        artistFilled = {
            ...res.body
        };
    })

    test('update an artists listening count', async () => {
        artists.listeningCount = 0;
        const res = await request(app)
            .put('/artist/listento/:id')
            .set('authorization', `Bearer ${Usertoken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('listeningCount');
        expect(res.body.listeningCount).toBe(1);
        artistFilled = {
            ...res.body
        };
    })
})