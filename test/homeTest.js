// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
const expect    = chai.expect();
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');

describe('Home', function() {
    describe('GET', function() {
        it('200', function(done) {
        request(app)
        .get('/')
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