const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) =>{
    //Log to console for dev
    console.log(err.stack);
    
    //Mongoose bad ObjectId
    if(err.name === 'CastError'){
        const message = `Resource not found with the id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false, 
        error: error.message || "server error"
    });
};

module.exports = errorHandler;