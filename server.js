const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.js');
//Route files
const bootcamps = require('./routes/bootcamps');

dotenv.config({path: './config/config.env'}); //Example: 'KEY=value' becomes { parsed: { KEY: 'value' } }


//Connecting to database
connectDB();

const app = express();

//Body Parser
app.use(express.json());

//Dev Logging middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//Mount errorhandler

app.use(errorHandler);


const PORT = process.env.PORT || 5900;

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

