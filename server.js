const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/congi.env'});

const app = express();
app.get('/',(req, res)=>{
    res.status(400).json({name:'Jaspreet'})
});
const PORT = process.env.PORT || 5900;

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

