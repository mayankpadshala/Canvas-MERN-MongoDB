var chai = require('chai');
var assert = require('chai').assert;
var app = require('../server');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);

// describe('Should have 3 announements', function(){
//     it('/course/announcement',function(){
//         agent.post('/course/announcement').send({
//             COURSEID : 299
//         }).end(function (err, res) {
//             // console.log(res.body)
//             expect(res).to.have.status(200);
//             expect(res.body.announcements.length).to.equal(3);
//         })
//     });
// })

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

// describe('Should get 3 assignments', function(){
//     it('/files/getAssignments',function(){
//         agent.post('/files/getAssignments').send({
//             COURSEID : "299",
//         }).end(function (err, res) {
//             expect(res).to.have.status(200);
//             expect(res.body.length).to.equal(4);
//         })
//     });
// })
// describe('Should get 4 addCodes', function(){
//     it('/course/getAddCodes',function(){
//         agent.post('/course/getAddCodes').send({
//             COURSEID : "299",
//         }).end(function (err, res) {
//             expect(res).to.have.status(200);
//             expect(res.body.length).to.equal(2);
//         })
//     });
// })