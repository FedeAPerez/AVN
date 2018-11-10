module.exports = {
    fromListOfPatientsToBasicData(listOfPatients) {
        let newListOfPatients = [];
        let listOfIds = Object.keys(listOfPatients);
        listOfIds.forEach(elem => {
            newListOfPatients.push({
                idPatient: elem,
                name: listOfPatients[elem].name,
                beginDate: listOfPatients[elem].beginDate
                
            });
        })
        return newListOfPatients;
    }
};