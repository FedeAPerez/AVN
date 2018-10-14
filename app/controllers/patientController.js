module.exports = {
    getAllPatients: function(req, res, next) {
        res.send({
            "head": {
                "route": "patient",
                "operation": "get",
                "status": 200
            },
            "data": {
                "patients" : [
                    {
                        name: "Federico Pérez",
                        age: 23,
                        beginDate: "12/10/2017",
                        observations: "Mejoró el 32% de su movilidad en solo 4 semanas"
                    },
                    {
                        name: "Chipi Barijho",
                        age: 29,
                        beginDate: "12/10/2019"
                    }
                ]
            }
        });
        next();
    }
};