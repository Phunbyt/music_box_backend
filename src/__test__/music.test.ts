import request from 'supertest';
import app from '../app';
import {
	testDbConnect,
	dbDisconnect,
} from '../config/database/memoryserver';
beforeAll(async () => {
	await testDbConnect();
	console.log('beforeAll', 'i am here');
});
afterAll(async () => {
	await dbDisconnect();
});
const currentUser: Record<string, string> = {};
let trackId = '';
let dataPrefilled: any;

describe('POST/ signup and signin', () => {
	test('test for sig nup', async () => {
		const res = await request(app).post('/music/signUp').send({
			firstName: 'aderemi',
			lastName: 'amos',
			dateOfBirth: '1990-09-12',
			gender: 'male',
			email: 'aderemiamos@gmail.com',
			password: '12345678',
			confirmPassword: '12345678',
		});
		expect(res.status).toBe(201);
		expect(res.body.message).toBe('User Created Successfully');
	});
	test('test for sign in', async () => {
		const res = await request(app).post('/music/signIn').send({
			email: 'aderemiamos@gmail.com',
			password: '12345678',
		});
		expect(res.status).toBe(200);
		expect(res.body.status).toBe('success');
		const token = res.body.token;
		currentUser.token = token;
		expect(res.body.token).toBe(token);
	});
});

describe('POST/ listening history', () => {
	test('test to add song to listening history', async () => {
		const res = await request(app).post('/listeninghistory').send({
			trackId: 3135556,
			trackTitle: 'Harder, Better, Faster, Stronger',
			trackLink : 'https://www.deezer.com/track/3135556',
			trackArtist: 'Daft Punk',
			trackAlbum: 'Discovery'
		})
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body.message).toBe('success');
		expect(res.body.data).toHaveProperty('trackId');

	});
});

describe('POST/ listening history', () => {
	test('test to add the song again to listening history', async () => {
		const res = await request(app).post('/listeninghistory').send({
			trackId: 3135556,
			trackTitle: 'Harder, Better, Faster, Stronger',
			trackLink : 'https://www.deezer.com/track/3135556',
			trackArtist: 'Daft Punk',
			trackAlbum: 'Discovery'
		})
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body.message).toBe('success');
		expect(res.body.data).toHaveProperty('trackId');
  
	});
});

describe('GET/ listening history', () => {
	test('test to get user\'s listening history', async () => {
		const res = await request(app).get('/listeninghistory')
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe('success');
		expect(res.body.data[0]).toHaveProperty('trackId');
		trackId = res.body.data[0].trackId;
  
	});
});

describe('DELETE/ listening history', () => {
	test('test to delete song from user\'s listening history', async () => {
		const res = await request(app).delete(`/listeninghistory/${trackId}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe('success');
		expect(res.body.data).toBe('track deleted');
  
	});
});
