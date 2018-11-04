// Librerías de 3ros
const request   = require('supertest');
const chai      = require('chai');
chai.should();
// Librerías propias y enlaces de configuración
const firebase  = require('../config/firebase');
firebase.init();
const app       = require('../config/app');
let exerciseId;
let updatedExerciseId;
describe('Exercise', function() {
    describe('POST', function() {
        it('200 - Debe aceptar el req con todos los datos correctos', function(done) {
            request(app)
            .post('/exercise')
            .set('Accept', 'application/json')
            .send({
                difficulty : "1",
                name: "Analítico",
                description: "Es un ejercicio de movimiento simple, ideal para las primeras sesiones de rehabilitación",
                initialState : "A123B123C23D23",
                endingState : "A23B1233D23"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                exerciseId = res.body.data.exerciseId;
                if (err) return done(err);
                done();
            });
        });

        it('200 - Debe aceptar el req con todos los datos correctos para otra dificultad', function(done) {
            request(app)
            .post('/exercise')
            .set('Accept', 'application/json')
            .send({
                difficulty : "2",
                name: "Global",
                description: "Es un ejercicio de movimiento completo que no contiene una carga extra.",
                initialState : "090120040020",
                endingState : "090120040020"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res ) => {
                updatedExerciseId = res.body.data.exerciseId;
                if (err) return done(err);
                done();
            });
        });


        it('400 - Debe fallar el req difficulty faltante y objetos inicial y final', function(done) {
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

    describe("DELETE", function() {
        it("200 - debe eliminar la ref que fue creada", function(done) {
            request(app)
            .delete('/exercise/'+exerciseId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });
    });

    describe("PUT", function() {
        it("200 - debe modificar segun el id creado", function(done) {
            request(app)
            .put('/exercise/'+updatedExerciseId)
            .set('Accept', 'application/json')
            .send({
                difficulty : "2",
                name: "Global",
                description: "Es un ejercicio de movimiento completo que no contiene una carga extra. Ideal para cuando se completaron varias sesiones.",
                initialState : "090120040020",
                endingState : "090120040020"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
        });
    });

    describe("GET", function() {
        it("200 - Debería devolver un listado de todos los ejercicios", function(done) {
            request(app)
            .get('/exercise')
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