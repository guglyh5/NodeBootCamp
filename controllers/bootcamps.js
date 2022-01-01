const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get Single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public 
exports.getBootcamp = asyncHandler(async (req, res, next) =>{

        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp)
        {
        return next(new ErrorResponse(`Bootcamp not found with ${req.params.id})`,404));
        }
        res
        .status(200)
        .json({success: true, data: bootcamp});
    
});

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public 
exports.getBootcamps = asyncHandler(async (req, res, next) =>{
    
        const bootcamps = await Bootcamp.find();
        const count = await Bootcamp.count();
        res
        .status(200)
        .json({success: true, count: count, data: bootcamps});
    
});

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Public 
exports.createBootcamp= asyncHandler(async (req, res, next) =>{
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp});
});


// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public 
exports.UpdateBootcamp= asyncHandler(async (req, res, next) =>{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true
    });
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with ${req.params.id})`,404));
    }
    res.status(200).json({success:true,data: bootcamp});
});

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public 
exports.DeleteBootcamp= asyncHandler(async (req, res, next) =>{

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp)
        {
            return next(new ErrorResponse(`Bootcamp not found with ${req.params.id})`,404));
        }
        res.status(200).json({success:true, data:{}});
});