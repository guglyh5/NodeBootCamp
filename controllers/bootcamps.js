const Bootcamp = require('../models/Bootcamp');
// @desc    Get Single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public 
exports.getBootcamp = async (req, res, next) =>{
    try{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp)
        {
        return res
            .status(404)
            .json({success: false});
        }
        res
        .status(200)
        .json({success: true, data: bootcamp});

    }
    catch(err)
    {
        res
        .status(400)
        .json({success: false});
    }
    
};

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public 
exports.getBootcamps = async (req, res, next) =>{
    try{
        const bootcamps = await Bootcamp.find();
        const count = await Bootcamp.count();
        res
        .status(200)
        .json({success: true, count: count, data: bootcamps});
        
    }
    catch(err)
    {
        res.status(400).json({success:false, msg: 'Failure: Invalid request'});
    }
    
};

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Public 
exports.createBootcamp= async (req, res, next) =>{
    try{
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp});
    }
    catch(err){
        res.status(400).json({success: false});
    }
};


// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public 
exports.UpdateBootcamp= async (req, res, next) =>{
    try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true
    });

    if(!bootcamp) {
        return res.status(404).json({success: false});
    }
    res.status(200).json({success:true,data: bootcamp});
    }
    catch(err)
        {
            res.status(400).json({success:false});
        }
};

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public 
exports.DeleteBootcamp= async (req, res, next) =>{
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp)
        {
            return res.status(404).json({success:false});
        }
        res.status(200).json({success:true, data:{}});
    }
    catch(err)
    {
        res.status(400).json({success:false});
    }

};