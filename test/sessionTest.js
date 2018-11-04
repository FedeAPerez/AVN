// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');

describe('Session', function() {
    describe('POST', function() {
        it('200', function(done) {
        request(app)
        .post('/session')
        .set('Accept', 'application/json')
        .send([
            {Token: "9999999_0",
            Ejercicio: 3}
        ])
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
        });

    });
});