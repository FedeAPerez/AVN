// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');

describe('Comment', function() {
    describe('POST', function() {
        it('200 - Debe aceptar el req con todos los datos correctos para agregar comentarios', function(done) {
            request(app)
            .post('/patient/38662776/comment')
            .set('Accept', 'application/json')
            .send({
                comment: "Evoluciones frecuentes en las últimas semanas."
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
        });
    });
});