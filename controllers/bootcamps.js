
// @desc    Get Single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public 
exports.getBootcamp = (req, res, next) =>{
    res
        .status(200)
        .json({success: true, msg: `Show bootcamp ${req.params.id}`});
};

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public 
exports.getBootcamps = (req, res, next) =>{
    res
        .status(200)
        .json({success: true, msg: 'Show all bootcamps'});
};

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Public 
exports.createBootcamp= (req, res, next) =>{

    res
        .status(200)
        .json({success: true, msg: 'Create new bootcamp'});
};


// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public 
exports.UpdateBootcamp= (req, res, next) =>{
    res
        .status(200)
        .json({success: true, msg: `Update bootcamp ${req.params.id}`});
};

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public 
exports.DeleteBootcamp= (req, res, next) =>{
    res
        .status(200)
        .json({success: true, msg: `Delete bootcamp ${req.params.id}`});

};