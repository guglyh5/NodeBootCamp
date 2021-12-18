const errorHandler = (err, req, res, next) =>{
    //Log to console
    console.log(err.stack);
    
    res.status(err.statusCode || 500).json({
        success: false, 
        error: err.message || "server error"
    });
};

module.exports = errorHandler;