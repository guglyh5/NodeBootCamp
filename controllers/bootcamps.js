const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');

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
        console.log(req.query);
        let query;
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        console.log(queryStr);
        query = Bootcamp.find(JSON.parse(queryStr));
        const bootcamps = await query;
        // const count = await Bootcamp.count();
        res
        .status(200)
        .json({success: true, count: bootcamps.length, data: bootcamps});
    
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

// @desc    Get bootcamps within radius
// @route   GET /api/v1/bootcamps/:zipcode/:distance
// @access  Public 
exports.getBootcampInRadius= asyncHandler(async (req, res, next) =>{
    const { zipcode, distance } = req.params;
    //Get lat/long from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc distance using radians
    // Divide distance by radius of earth
    //Radius of the earth = 6378 km / 3963 mi
    const radius =  distance/3963;
    const bootcamps = await Bootcamp.find({
       location:{ $geoWithin: { $centerSphere: [ [lng, lat ], radius ] }}
    });
    res.status(200).json({
        success:true,
        count: bootcamps.length,
        data: bootcamps
    });
});