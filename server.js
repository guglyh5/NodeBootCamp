const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: './config/congi.env'});

//Route files
const bootcamps = require('./routes/bootcamps');

dotenv.config({path: './config/config.env'})  //Example: 'KEY=value' becomes { parsed: { KEY: 'value' } }

const app = express();


//Dev Logging middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}


//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


app.get('/',(req, res)=>{
    res.status(400).json({name:'Jaspreet'})
});
const PORT = process.env.PORT || 5900;

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

