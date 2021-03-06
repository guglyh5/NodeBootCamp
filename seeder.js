const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colours = require('colors')

//Load env variables
dotenv.config({path: './config/config.env'});

//Load models
const Bootcamp = require('./models/Bootcamp');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));

//Import into DB
const importData = async () => {
    try{
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
        process.exit
    }catch(err)
    {
        console.error(err);
    }
}

//Delete Data

const deleteData = async () => {
    try{
        await Bootcamp.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit
    }catch(err)
    {
        console.error(err);
    }
}

if(process.argv[2] === '-i'){
importData();
}
if(process.argv[2] === '-d'){
    deleteData();
}