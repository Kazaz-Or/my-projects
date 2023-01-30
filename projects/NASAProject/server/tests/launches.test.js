const request = require('supertest');
const app = require('../src/app');

const { mongoConnect, mongoDisconnect } = require('../src/utils/mongo');
const { saveLaunch } = require('../src/models/launches.model');
const { testLaunch, validResponse } = require('./testData');
const { isValid } = require('./utils');


describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('GET launches endpoint', () => {
        test('Happy path - response 200', async () => {
            const response = await request(app).get('/api/v1/launches');
            expect(response.statusCode).toBe(200);
        });
        test('Happy path - Headers', async () => {
            await request(app)
            .get('/api/v1/launches')
            .expect('Content-Type', /json/);
        });
        test('Happy path - response', async () => {
            await request(app)
            .get('/api/v1/launches')
            expect(isValid)
        });
        test('Happy path - response with limit', async () => {
            const response = await request(app).get('/api/v1/launches?limit=10');
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toEqual(10);

            const response2 = await request(app).get('/api/v1/launches?limit=20');
            expect(response2.statusCode).toBe(200);
            expect(response2.body.length).toEqual(20);
        });
    });

    describe('POST launches endpoint', () => {
        test('Happy path - response 201', async () => {
            await request(app)
            .post('/api/v1/launches')
            .send(testLaunch)
            .expect(201);
        });
        test('Happy path - response', async () => {
            const { body: response } = await request(app)
            .post('/api/v1/launches')
            .send(testLaunch)
            .expect(201)

            expect(isValid)
            expect(response).toMatchObject(validResponse)
        });
        test('Happy path - Headers', async () => {
            await request(app)
            .post('/api/v1/launches')
            .send(testLaunch)
            .expect('Content-Type', /json/);
        });
        test('Error Case - New Launch - Invalid Planet response', async () => {
            const testLaunchInvalidPlanet = {...testLaunch, target: 'invalidPlanet'};
            const response = await saveLaunch(testLaunchInvalidPlanet);
            expect(response).toEqual(undefined);
        });
        test('Error Case - New Launch - Missing Property - mission', async () => {
            let testLaunchMissingMissionProperty = {...testLaunch};
            delete testLaunchMissingMissionProperty.mission;
            await request(app)
            .post('/api/v1/launches')
            .send(testLaunchMissingMissionProperty)
            .expect(400)
            .expect({"error":"Missing required launch property"});
        });
        test('Error Case - New Launch - Missing Property - rocket', async () => {
            let testLaunchMissingMissionProperty = {...testLaunch};
            delete testLaunchMissingMissionProperty.rocket;
            await request(app)
            .post('/api/v1/launches')
            .send(testLaunchMissingMissionProperty)
            .expect(400)
            .expect({"error":"Missing required launch property"});
        });
        test('Error Case - New Launch - Missing Property - target', async () => {
            let testLaunchMissingMissionProperty = {...testLaunch};
            delete testLaunchMissingMissionProperty.target;
            await request(app)
            .post('/api/v1/launches')
            .send(testLaunchMissingMissionProperty)
            .expect(400)
            .expect({"error":"Missing required launch property"});
        });
        test('Error Case - New Launch - Empty Payload', async () => {
            await request(app)
            .post('/api/v1/launches')
            .send({})
            .expect(400)
            .expect({"error":"Missing required launch property"});
        });
        test('Error Case - New Launch - Send Null', async () => {
            await request(app)
            .post('/api/v1/launches')
            .send(null)
            .expect(400)
            .expect({"error":"Missing required launch property"});
        });
        test('Error Case - New Launch - Send undefined', async () => {
            await request(app)
            .post('/api/v1/launches')
            .send(undefined)
            .expect(400)
            .expect({"error":"Missing required launch property"});
        });
        test('Error Case - New Launch - Invalid Date', async () => {
            let testLaunchInvalidDate = {...testLaunch};
            testLaunchInvalidDate.launchDate = "Invalid Date"
            await request(app)
            .post('/api/v1/launches')
            .send(testLaunchInvalidDate)
            .expect(400)
            .expect({"error": "Invalid launch date"});
        });
    });

    describe('DELETE launches endpoint', () => {
        let id;
        beforeEach(async () => {
            const {body: response} = await request(app).post('/api/v1/launches').send(testLaunch)
            id = response.flightNumber;
        });
        test('Happy path - response 200', async () => {
            await request(app)
            .delete(`/api/v1/launches/${id}`)
            .expect(200);
        });
        test('Happy path - Headers', async () => {
            await request(app)
            .delete(`/api/v1/launches/${id}`)
            .expect('Content-Type', /json/);
        });
        test('Happy path - response', async () => {
            const { body: response } = await request(app)
            .delete(`/api/v1/launches/${id}`)
            .expect(200)

            expect(isValid)
            expect(response).toEqual({ok: true})
        });
        test('Error Case - Abort Launch - Invalid Launch Id', async () => {
            const randomNumber = Math.floor(Math.random() * (1020 - 1000 +1) + 1000);
            await request(app)
            .delete(`/api/v1/launches/${randomNumber}`)
            .expect(404)
            .expect({"error": "Launch not found"});
        });
    });
});
