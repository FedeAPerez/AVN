// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');

describe('Exercise', function() {
    describe('POST', function() {
        it('200 - Debe aceptar el req con todos los datos correctos', function(done) {
            request(app)
            .post('/exercise')
            .set('Accept', 'application/json')
            .send({
                difficulty : "Principiante",
                name: "Analítico",
                description: "Es un ejercicio de movimiento simple, ideal para las primeras sesiones de rehabilitación"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });

        it('200 - Debe aceptar el req con todos los datos correctos para otra dificultad', function(done) {
            request(app)
            .post('/exercise')
            .set('Accept', 'application/json')
            .send({
                difficulty : "Intermedio",
                name: "Global",
                description: "Es un ejercicio de movimiento completo que no contiene una carga extra."
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });


        it('400 - Debe fallar el req difficulty faltante', function(done) {
            request(app)
            .post('/exercise')
            .set('Accept', 'application/json')
            .send({
                name: "Analítico",
                description: "Es un ejercicio de movimiento simple, ideal para las primeras sesiones de rehabilitación"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });
    });
});