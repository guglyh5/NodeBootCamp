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
        let query;
        //copy req.query
        const reqQuery = { ...req.query };

        //Fields to exclude
        const removeFields = ['select'];
        
        //Loop from removefields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        //create query string
        let queryStr = JSON.stringify(reqQuery);

        //create operators ($gt, $lte etc.)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //finding resource
        query = Bootcamp.find(JSON.parse(queryStr));

        //Select fields
        if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
        }

        //Sort fields
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
            }else{
                query=query.sort('-created_at');
            }

        //executing query
        const bootcamps = await query;

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