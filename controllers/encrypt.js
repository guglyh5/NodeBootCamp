const encrypt = require('../middleware/encrypt');
const key = 'bmx3aXVoMTJrMzFram5rbGR1Z283MTI=';
const iv = 'jm8lgqa3j1d0ajus';

exports.encryptData = async (req, res, next) =>{
    try{
        const stringy = JSON.stringify(req.body);
    const encrypt2 = await encrypt(stringy,key,iv);
        console.log(encrypt2);
    res.status(200).json({success: true, data: encrypt2});
    }
    catch(err){
        res.status(400).json({success: false,data: err.message});
    }
};