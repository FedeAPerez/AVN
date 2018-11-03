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
    it('200', function(done) {
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

    it('404', function(done) {
      request(app)
      .get('/patient/25')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('DELETE', function() {
    it('200', function(done) {
      // Eliminar no genera error de not found 404 / pendiente
      request(app)
      .delete('/patient/23')
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