const https = require('https');
const fs = require('fs');
const { strToDate } = require('../utils/strToDate');

const files = {
    medicaments: 'CIS_bdpm'
};

const dbSchema = {
    [files.medicaments]: [
        'CIS',
        'denomination',
        'forme_pharmaceutique',
        'voies_administration',
        'statut_admin_AMM',
        'type_procedure_AMM',
        'etat_commercialisation',
        'date_AMM',
        'statut_BDM',
        'numero_autorisation_europeenne',
        'titulaires',
        'surveillance_renforcee'
    ]
}

const mappings = {
    [files.medicaments]: {
        'surveillance_renforcee': ouiNonToBooleans,
        'date_AMM': v => v ? strToDate(v) : v,
        'titulaires': v => v ? v.split(';').map(s => s.trim()) : [],
    }
}

function ouiNonToBooleans(value) {
    if (value) {
        if (value.toLowerCase() === 'non') return false;
        if (value.toLowerCase() === 'oui') return true;
    }
    return value;
}

const readFile = async () => {
    const path = "./CIS_bdpm.json"
    ws = fs.createWriteStream(path, 'utf8');
    
    return new Promise((resolve, reject) => {
        const url = new URL(`https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt`);
        const req = https.request(url, res => {
            // TODO: handle errors
            if (res.statusCode !== 200) {
                reject('Status code != 200');
                res.resume();
                return;
            }
            res.setEncoding('latin1');
            let data = '';
            res.on('data', d => { data += d; });
            res.on('end', () => resolve(data));
        })
        req.on('error', e => reject(e));
        req.end();
    });
}

async function getProperties() {
    const content = await readFile();
    const jsonContent = content
    .split(/\r?\n/)
    .filter(line => line) // we ignore empty lines
    .map((line, _) => {
        const obj = {};
        for (let [i, p] of line.split('\t').entries()) {
            const prop = dbSchema['CIS_bdpm'][i];
            const mapping = (mappings['CIS_bdpm'] || {})[prop];
            p = p.trim() || null; // empty values are set to null
            if (mapping) p = mapping(p);
            obj[prop] = p;
        };
        return obj;
    });
    return jsonContent;
};

module.exports = { getProperties }
