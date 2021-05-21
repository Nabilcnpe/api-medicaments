const Medoc = require('../models/medoc');

const getMedocs = async (req, res) => {

    try {
        const medocs = await Medoc.find();

        res.send(medocs);
    } catch (error) {
        res.send({ message: error });
    }

};

const searchMedocs = async (req, res) => {
    
    try {
        const listOfParams = Array.from(Object.keys(req.query));
        const { title, cis } = req.query;
        let searchObject = {};

        if (listOfParams.length < 1) throw new Error('Incorect number of arguments');

        if (title) {
            const regex = new RegExp(title, 'i');
            searchObject = { ...{ denomination: { $regex: regex } } }
        } else if (cis) {
            searchObject = { ...{ CIS: cis } }
        } else {
            throw new Error('Paramètres acceptés : cis | title');
        }
        
        const filteredMedocs = await Medoc.find(searchObject);
        
        if (filteredMedocs.length === 0) throw new Error('No medoc with that criterias');

        res.send(filteredMedocs);
    } catch (error) {
        res.send({ message: error.message })
    }
    
};

module.exports = {
    getMedocs,
    searchMedocs
};
