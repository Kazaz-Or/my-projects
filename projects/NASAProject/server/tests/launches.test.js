const request = require('supertest');
const app = require('../src/app');

const { testLaunch, validResponse } = require('./testData')
const { isValid } = require('./utils')


describe('GET launches endpoint', () => {
    test('Happy path - response 200', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    });
    test('Happy path - Headers', async () => {
        await request(app)
        .get('/launches')
        .expect('Content-Type', /json/);
    });
    test('Happy path - response', async () => {
        await request(app)
        .get('/launches')
        
        expect(isValid)
    });
});


describe('POST launches endpoint', () => {
    test('Happy path - response 201', async () => {
        await request(app)
        .post('/launches')
        .send(testLaunch)
        .expect(201);
    });
    test('Happy path - response', async () => {
        const { body: response } = await request(app)
        .post('/launches')
        .send(testLaunch)
        .expect(201)
        
        expect(isValid)
        expect(response).toMatchObject(validResponse)
    });
    test('Happy path - Headers', async () => {
        await request(app)
        .post('/launches')
        .send(testLaunch)
        .expect('Content-Type', /json/);
    });
    test('Error Case - New Launch - Missing Property - mission', async () => {
        let testLaunchMissingMissionProperty = {...testLaunch};
        delete testLaunchMissingMissionProperty.mission;
        await request(app)
        .post('/launches')
        .send(testLaunchMissingMissionProperty)
        .expect(400)
        .expect({"error":"Missing required launch property"});
    });
    test('Error Case - New Launch - Missing Property - rocket', async () => {
        let testLaunchMissingMissionProperty = {...testLaunch};
        delete testLaunchMissingMissionProperty.rocket;
        await request(app)
        .post('/launches')
        .send(testLaunchMissingMissionProperty)
        .expect(400)
        .expect({"error":"Missing required launch property"});
    });
    test('Error Case - New Launch - Missing Property - target', async () => {
        let testLaunchMissingMissionProperty = {...testLaunch};
        delete testLaunchMissingMissionProperty.target;
        await request(app)
        .post('/launches')
        .send(testLaunchMissingMissionProperty)
        .expect(400)
        .expect({"error":"Missing required launch property"});
    });
    test('Error Case - New Launch - Empty Payload', async () => {
        await request(app)
        .post('/launches')
        .send({})
        .expect(400)
        .expect({"error":"Missing required launch property"});
    });
    test('Error Case - New Launch - Send Null', async () => {
        await request(app)
        .post('/launches')
        .send(null)
        .expect(400)
        .expect({"error":"Missing required launch property"});
    });
    test('Error Case - New Launch - Send undefined', async () => {
        await request(app)
        .post('/launches')
        .send(undefined)
        .expect(400)
        .expect({"error":"Missing required launch property"});
    });
    test('Error Case - New Launch - Invalid Date', async () => {
        let testLaunchInvalidDate = {...testLaunch};
        testLaunchInvalidDate.launchDate = "Invalid Date"
        await request(app)
        .post('/launches')
        .send(testLaunchInvalidDate)
        .expect(400)
        .expect({"error": "Invalid launch date"});
    });
});


describe('DELETE launches endpoint', () => {
    test('Happy path - response 200', async () => {
        await request(app)
        .delete('/launches/100')
        .expect(200);
    });
    test('Happy path - Headers', async () => {
        await request(app)
        .delete('/launches/100')
        .expect('Content-Type', /json/);
    });
    test('Happy path - response', async () => {
        const { body: response } = await request(app)
        .delete('/launches/102')
        .expect(200)
        
        expect(isValid)
        expect(response.success).toEqual(false)
        expect(response.upcoming).toEqual(false)
    });
    test('Error Case - Abort Launch - Invalid Launch Id', async () => {
        await request(app)
        .delete('/launches/invalid')
        .expect(404)
        .expect({"error": "Launch not found"});
    });
});