// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');
let customId;
let updatedCustomId;
describe('Exercise', function() {
    describe("POST", function() {
        it("400 - Debería fallar al crear custom por faltar el estado final", function(done) {
            request(app)
            .post('/custom/-LQVjmX0LKfzC1Psu6pm/38662776')
            .set('Accept', 'application/json')
            .set({
                initialState: "*900010010199"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });

        it("400 - Debería fallar al crear custom por faltar el estado inicial", function(done) {
            request(app)
            .post('/custom/-LQVjmX0LKfzC1Psu6pm/38662776')
            .set('Accept', 'application/json')
            .set({
                endingState: "*900200010188"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });

        it("200 - Debería crear un custom con todos sus parametros", function(done) {
            request(app)
            .post('/custom/-LQVjmX0LKfzC1Psu6pm/38662776')
            .set('Accept', 'application/json')
            .send({
                initialState: "*900010010199",
                endingState: "*900200010188"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });

    });
});