import request from 'supertest';
import app from '../app';
import axios from 'axios';
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

const currentUser: Record<string, string> = {};
let dataPrefilled: any;
let dataPreFilled: any = {};
let ID = '';
let trackId = '';
let UserId: string;

let albumId = '';




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
		UserId = res.body.user._id;
		expect(res.body.token).toBe(token);
	});
});

describe('GET all genres and genre', () => {
	test('get all genres', async () => {
		const fetch = await axios.get('https://api.deezer.com/genre');
		const res = await request(app)
			.get('/music/genres')
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe('successful');

		dataPrefilled = fetch.data.data[1];
	});

	test('get a genre by id', async () => {
		const res = await request(app)
			.get(`/music/genres/${dataPrefilled.id}`)
			.set('Authorization', `Bearer ${currentUser.token}`);
		ID = res.body.data[0]._id;

		expect(res.status).toBe(200);
		expect(res.body.message).toBe('Successful');
	});
});

describe('Test for playlist creation', () => {
	test('User should be able to create a playlist', async () => {
		const playlist: any = {
			name: 'The beatles',
			category: 'public',
			songs: [],
			genre: 'Rock',
		};

		const res = await request(app)
			.post('/playlist/create')
			.send(playlist)
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body.status).toBe('success');
		dataPreFilled = res.body.data;
		//id = res.body.data._id;
	});
});

describe('GET playlist and artist', () => {
	test('get artist associated to a genre', async () => {
		const ID = dataPrefilled.id;
		const res = await request(app)
			.get(`/genre/artist/${ID}`)
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(res.body.message).toBe('Artist Genre');
	});
});


describe('Find and create data / Update data', () => {
	it('successfully searches for an album', async () => {
		const queryParams = 'twice as tall';
		const result = await request(app)
			.post(`/album?q=${queryParams}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(result.status).toEqual(200);
		expect(result.body.message).toEqual(
			' Data successfully created' || 'Data already in the database'
		);
		albumId = result.body.info[0]._id;
	});
});

describe('', () => {
	it('user successfully likes an album', async () => {
		const result = await request(app)
			.put(`/album/like/${albumId}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(result.status).toEqual(200);
		expect(result.body.data.likeCount).toBe(1);
	});

	it('user successfully listens to song in an album', async () => {
		const result = await request(app)
			.put(`/album/listened/${albumId}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(result.status).toEqual(200);
		expect(result.body.data.listeningCount).toBe(1);
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

describe('create artist, like artist and listen to artist', () => {
	test('create a new artist', async () => {
		const queryParams = 230;
		const res = await request(app)
			.post(`/artist/create/${queryParams}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('artistName');
		expect(typeof res.body === 'object').toBe(true);
		UserId = res.body._id;
	});

	test('update a artists like', async () => {
		const res = await request(app)
			.put(`/artist/like/${UserId}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('message');
		expect(res.body.info.likeCount).toBe(1);

	});

	test('update an artists listening count', async () => {
		const res = await request(app)
			.put(`/artist/listento/${UserId}`)
			.set('authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(res.body.artistInfo).toHaveProperty('listeningCount');
		expect(res.body.artistInfo.listeningCount).toBe(1);
        
	});
});

describe('Recently played medias are saved', () => {
	it('saves recently played album', async () => {
		const album = {
			directory: 'album',
			directoryID: '60bd63c7deb0272217afc0ab',
		};
		const res = await request(app)
			.post('/playlist/saveRecentlyPlayed')
			.send(album)
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body.album).toBeTruthy();
	});
	it('saves recently played playlist', async () => {
		const playlist = {
			directory: 'playlist',
			directoryID: '60bd29e801697b06e54bb9d7',
		};
		const res = await request(app)
			.post('/playlist/saveRecentlyPlayed')
			.send(playlist)
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body.album).toBeTruthy();
	});
	it('saves recently played artist', async () => {
		const artist = {
			directory: 'artist',
			directoryID: '60bd490341c9d5a020e1d557',
		};
		const res = await request(app)
			.post('/playlist/saveRecentlyPlayed')
			.send(artist)
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(201);
		expect(res.body.album).toBeTruthy();
	});
});
describe('Recently played medias can be seen by user', () => {
	it('gets recently played album, playlist, and artist', async () => {
		const res = await request(app)
			.get('/playlist/getRecentlyPlayed')
			.set('Authorization', `Bearer ${currentUser.token}`);
		expect(res.status).toBe(200);
		expect(Object.keys(res.body).length).toBe(3);
	});
});
