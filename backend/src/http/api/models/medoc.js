const mongoose = require('mongoose');

const medocSchema = new mongoose.Schema({
    CIS: {
        type: String,
        unique: true
    },
    denomination: {
        type: String
    },
    forme_pharmaceutique: {
        type: String
    },
    voies_administration: {
        type: String
    },
    statut_admin_AMM: {
        type: String
    },
    type_procedure_AMM: {
        type: String
    },
    etat_commercialisation: {
        type: String
    },
    date_AMM: {
        type: Date
    },
    statut_BDM: {
        type: String
    },
    numero_autorisation_europeenne: {
        type: String
    },
    titulaires: [
        {
            type: String
        }
    ],
    surveillance_renforcee: {
        type: Boolean
    },
});

module.exports = mongoose.model('Medoc', medocSchema);
