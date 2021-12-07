const encrypt = require('../middleware/encrypt');
const key = 'bmx3aXVoMTJrMzFram5rbGR1Z283MTI=';
const iv = 'jm8lgqa3j1d0ajus';

exports.encryptData = async (req, res, next) =>{
    try{
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp});
    }
    catch(err){
        res.status(400).json({success: false});
    }
};