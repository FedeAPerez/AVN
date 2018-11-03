// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
const expect    = chai.expect();
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');

describe('Patient', function() {
  describe('GET', function() {
    it('should return 200 when GET without header set and no auth', function(done) {
      request(app)
      .get('/patient/38662776')
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