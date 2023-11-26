// tests/taskController.test.js
const chai = require('chai');
const supertest = require('supertest');
const app = require('../app'); // Adjust the path accordingly
const User = require('../models/user'); // Import your User model
const mongoose = require('mongoose');
const expect = chai.expect;
const request = supertest(app);

describe('Task Controller Tests', () => {
    let createdTaskId;
    let authToken;
    before(async () => {
        // Perform login or get an authentication token here
        try {
            const regsiterRes = await request.post('/users/register')
            .set('User-Agent', 'PostmanRuntime/7.35.0') // Add User-Agent header
            .set('Accept', '*/*')
            .send({
                username: 'priyanka',
                password: 'chandrahas123',
            });
            console.log(regsiterRes.body)
            
        } catch (error) {
            console.error('Error creating test user:', error);
            throw error;
        }
        try {
            // Perform login or get an authentication token here
            const loginRes = await request.post('/users/login')
            .set('User-Agent', 'PostmanRuntime/7.35.0') // Add User-Agent header
            .set('Accept', '*/*')
            .send({
                username: 'priyanka',
                password: 'chandrahas123',
            });
            console.log(loginRes)
            authToken = loginRes.body.token;
            console.log("auth token - ",authToken)
        } catch (error) {
            console.error('Error obtaining authentication token:', error);
            throw error; // Rethrow the error to fail the test
        }
    });
    it('should create a new task', async () => {
        const res = await request.post('/tasks/').set('Authorization', `${authToken}`).send({
            user: "test user name",
            title: 'Test Task', 
            description: 'This is a test task',
            assignedUser: 'test_user',
            dueDate: '2023-11-25 21:37:00',
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        createdTaskId = res.body._id;
    });

    it('should get a task by ID', async () => {
        const res = await request.get(`/tasks/${createdTaskId}`).set('Authorization', `${authToken}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('_id', createdTaskId);
        expect(res.body).to.have.property('title', 'Test Task');
        // Add more assertions based on your task structure
    });
});
