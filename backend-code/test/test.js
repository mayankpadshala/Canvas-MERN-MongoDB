var chai = require('chai');
var assert = require('chai').assert;
var app = require('../server');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYWFkZDljOTE3Yzk1MTY3YmFkYWJhNyIsImZuYW1lIjoiU3R1ZGVudCIsImxuYW1lIjoiTG5hbWUiLCJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwic2pzdUlkIjoiMTIzIiwiZmFjdWx0eSI6ZmFsc2UsIlJFQ0VJVkVEX01FU1NBR0VTIjpbeyJfaWQiOiI1Y2IxYjU0ODBkN2RlOTBjMDkzZDM2ODkiLCJNRVNTQUdFIjoiVGhpcyBpcyBtZXNzYWdlIHRvIDEyMzEgZnJvbSAxMjMiLCJEYXRlIjoiMjAxOS0wNC0xM1QxMDowOToxMi43MThaIiwiRlJPTSI6IlN0dWRlbnQgTG5hbWUifSx7Il9pZCI6IjVjYjFiNzQwMGQ3ZGU5MGMwOTNkMzY4YiIsIk1FU1NBR0UiOiJTZWNvbmQgTWVzc2FnZSIsIkRhdGUiOiIyMDE5LTA0LTEzVDEwOjE3OjM2LjgyMVoiLCJGUk9NIjoiU3R1ZGVudCBMbmFtZSJ9LHsiX2lkIjoiNWNiMWI3NjAwZDdkZTkwYzA5M2QzNjhjIiwiTUVTU0FHRSI6IlRoaXJkIE1lc3NhZ2UiLCJEYXRlIjoiMjAxOS0wNC0xM1QxMDoxODowNy45NTBaIiwiRlJPTSI6IlN0dWRlbnQgTG5hbWUifSx7Il9pZCI6IjVjYjFiN2UwMDhlNjcxMGMyOGJjMTI5YyIsIk1FU1NBR0UiOiJGb3VydGggTWVzc2FnZSIsIkRhdGUiOiIyMDE5LTA0LTEzVDEwOjIwOjE2LjgzMloiLCJGUk9NIjoiU3R1ZGVudCBMbmFtZSIsIkZST01fU0pTVUlEIjoiMTIzIn1dLCJpYXQiOjE1NTUyODQwODAsImV4cCI6MTU1NTMxMjg4MH0.FvTesaH5cRC-9hA2IUwXYgWkl5-UzX450vpgR90d8pA"

describe('Should login', function(){
    it('/api/users/current',function(){
        agent.get('/api/users/current')        
        .set({ 'Authorization': token })
        .send({}).end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.fname).to.equal("Student");
        })
    });
})

describe('Should login', function(){
    it('/api/users/currentUser',function(){
        agent.get('/api/users/currentUser')        
        .set({ 'Authorization': token })
        .send({}).end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.length).to.equal(4);
        })
    });
})

describe('Should give profile if exists', function(){
    it('/api/profiles',function(){
        agent.get('/api/profiles')        
        .set({ 'Authorization': token })
        .send({}).end(function (err, res) {
            expect(res).to.have.status(200);
        })
    });
})

describe('Should give profile if exists', function(){
    it('/api/profiles/all',function(){
        agent.get('/api/profiles/all')        
        .set({ 'Authorization': token })
        .send({}).end(function (err, res) {
            expect(res).to.have.status(200);
            console.log(res.body)
        })
    });
})


describe('Should login', function(){
    it('/api/users/login',function(){
        agent.post('/api/users/login').send({
            sjsuId : "123",
            password : "123456",
        }).end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
        })
    });
})

