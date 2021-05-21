const chalk = require('chalk');

const { getProperties } = require('./data');
const { dbClose, dbConnect, dbDropCollection } = require('../../db');
const Medoc = require('../http/api/models/medoc');

saveMedocs = async () => {
    try {
        await dbConnect();
        await dbDropCollection('medocs');
        const data = await getProperties();
        await Medoc.insertMany(data);
        const count = await Medoc.estimatedDocumentCount();
        console.log(chalk.green(`${count} documents were imported !`));
        dbClose();
    } catch (error) {
        console.log({ message: error });
    }
}

saveMedocs();
