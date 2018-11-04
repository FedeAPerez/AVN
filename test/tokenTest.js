// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');
let token;
describe('Token', function() {
  describe('POST', function() {
    it('200 for POST', function(done) {
        request(app)
        .post('/token')
        .set('Accept', 'application/json')
        .send({
            patientId: "38662776",
            exerciseId: "-LQVdhyURbwOXbeiE4t1",
            repetitions: 3
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res ) => {
          token = res.body.data.token;
          if (err) return done(err);
          done();
        });
    });

  });
  describe('GET', function() {
    it('200', function(done) {
      request(app)
      .get('/token/'+token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
    });

  });

  describe('GET LIST', function() {
    it('200', function(done) {
      request(app)
      .get('/token/list/38662776')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
    });

  });



});