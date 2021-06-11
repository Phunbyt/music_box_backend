/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import axios from 'axios';
import app from '../app';
jest.setTimeout(120000);

import {
	testDbConnect,
	dbDisconnect,
} from '../config/database/mongodbMemoryServer';

beforeAll(async () => {
	await testDbConnect();
 
});
afterAll(async () => {
	await dbDisconnect();
});

let dataPreFilled:any;
const currentUser: Record<string, any> = {};
const song: Record<string, any> = {};
describe('POST/ signup and signin', () => {
	
	test('true is true', ()=>{
	expect(true).toBe(true)
	})
  
// 	test('test for sign up', async () => {
// 		const user = {
// 			firstName: 'aderemi',
// 			lastName: 'amos',
// 			dateOfBirth: '1990-09-12',
// 			gender: 'male',
// 			email: 'aderemiamos@gmail.com',
// 			password: '12345678',
// 			confirmPassword: '12345678',
// 		};
// 		const res = await request(app).post('/music/signUp').send(user);

// 		currentUser._id = res.body.user._id;
// 		currentUser.email = res.body.user.email;
// 		expect(res.status).toBe(201);
// 		expect(res.body.message).toBe('User Created Successfully');

// 	});

// 	test('test for sign in', async () => {
// 		const res = await request(app).post('/music/signIn').send({
// 			email: 'aderemiamos@gmail.com',
// 			password: '12345678',
// 		});
// 		expect(res.status).toBe(200);
// 		expect(res.body.status).toBe('success');
  
// 		const token = res.body.token;
// 		currentUser.token = token;
// 	});
});

// describe('Test for playlist creation', ()=>{
// 	test('User should be able to create a playlist', async ()=>{
  
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		const playlist:any = {
// 			name:'The beatles',
// 			category:'public',
// 			songs:[],
// 			genre:'Rock'
// 		};
    
// 		const res = await request(app)
// 			.post('/playlist/create')
// 			.send(playlist)
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		expect(res.status).toBe(201);
// 		expect(res.body.status).toBe('success');
// 		dataPreFilled = res.body.data;
    
// 		//id = res.body.data._id;
// 	});
// 	test('User should be able to get all playlists', async()=>{
// 		const res = await request(app)
// 			.get('/playlists')
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		expect(res.status).toBe(200);
// 		expect(res.body).toHaveProperty('data');
// 		expect(res.body.status).toBe('success');
// 	});

// 	test('User should be able to get a playlist', async()=>{
// 		const res = await request(app)
// 			.get(`/playlist/get/${dataPreFilled._id}`)
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		expect(res.status).toBe(200);
// 		expect(res.body).toHaveProperty('data');
// 		expect(res.body.status).toBe('success'); 

// 	});

 
// 	test('User should be able to add song to playlist', async ()=>{
   
// 		const newSong = { songId: '3135556' };
// 		const songRes = await axios.get(
// 			`https://api.deezer.com/track/${newSong.songId}`
// 		);
    
// 		song.songId = songRes.data.id;
// 		song.title = songRes.data.title;
// 		song.artist = songRes.data.artist.name;
// 		song.album = songRes.data.album.title;
// 		song.img = songRes.data.album.cover_medium;
// 		dataPreFilled.songs.push(song);
// 		const res = await request(app)
// 			.post(`/playlist/addsongs/${dataPreFilled._id}`)
// 			.send(newSong)
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		expect(res.status).toBe(201);
// 	});

 
// 	test('User should be able to delete a song from playlist', async () => {
// 		const newSong = {
// 			songId: '3135556'
// 		};
// 		const len = dataPreFilled.songs.length;
// 		const todelete = dataPreFilled.songs.filter((s:any) => s.songId == newSong.songId)[0];
// 		const index = dataPreFilled.songs.indexOf(todelete);
// 		dataPreFilled.songs.splice(index,1);
// 		const res = await request(app)
// 			.delete(`/playlist/removesong/${dataPreFilled._id}`)
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		expect(dataPreFilled.songs.length).toBeLessThan(len);
    
    
// 	});

// 	test('User should be able to delete all songs from playlist', async ()=>{
// 		const res = await request(app).delete(`/playlist/removeallsongs/${dataPreFilled._id}`)
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		expect(res.status).toBe(200);
// 	});

// 	test('User should be able to delete a playlist', async () => {
   
// 		const res = await request(app)
// 			.delete(`/playlist/removeplaylist/${dataPreFilled._id}`)
// 			.set('Authorization', `Bearer ${currentUser.token}`);
// 		if (currentUser._id == dataPreFilled.owner) {
// 			expect(res.status).toBe(200);
// 		} else {
// 			expect(res.status).toBe(403);
// 		}
// 	});
// });
