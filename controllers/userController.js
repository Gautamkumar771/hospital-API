// Import required libraries and models
const { json } = require('body-parser');
const Doctor = require('../models/doctor');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

// Controller for registering a new doctor
module.exports.registerDoctor = async(req,res, next) =>{
 // Try to create a new doctor, handle success and error cases
    try{
        const doctor = await Doctor.create(req.body);
console.log(doctor)
        res.status(200).json({
            success: true,
            message: "doctor created successfully",
        });
    }catch (error){
     
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
// Controller for doctor login
module.exports.login = async(req,res,next) => {
    // Try to find a doctor by name and validate password, then generate and send a JWT token
    try{
        let doctor = await Doctor.findOne({name: req.body.name});
console.log(req.body)
console.log(doctor)
        if(!doctor || doctor.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username/password"
            });
        }

        return res.status(200).json({
            message: 'Sign in successful.Here is your token',
            data: {
                //this will generate the jwt token and send in response
                token: jwt.sign(doctor.toJSON(),'verysecret',{expiresIn: '1h'})
            }
        }) 
    }catch(err){
        console.log('Error in doctor create session controller', err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

//controller for gesistring a patient
module.exports.registerPatient = async(req, res, next) =>{
     // Try to create a new patient associated with a doctor, handle success and error cases
    try{
        
        const patient = await Patient.create({...req.body,doctor:req.user._id});
        console.log(patient)

        res.status(200).json({
            success: true,
            message: "patient created successfully",
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}
// Controller for creating a medical report for a patient
module.exports.createReport = async(req,res,next) => {
     // Try to find a patient by ID, add a new report, and save it
try{
const patient = await Patient.findById(req.params.id);
req.body.date = Date.now();
patient.reports.push(req.body);
patient.save();
res.status(200).json({
    success: true,
    message:"report submitted successfully",
});
}catch(error){
    res.status(500).json({
        success: false,
        message: "could not create a report, internal server error"
    });
}
};
// Controller for fetching all reports of a patient
module.exports.all_reports = async(req, res, next) => {
      // Try to find a patient by ID and return their reports
try{
const patient = await Patient.findById(req.params.id);
res.status(200).json({
    success: true,
    reports: patient.reports,
});
}catch(error){
res.status(500).json({
    success: false,
    message: "could not able to fetch the patient reports"
});
}
};

// Controller for fetching all reports with a specific status
module.exports.AllReports = async(req, re, next) => {
     // Try to find all patients with reports matching the given status
    try{
        const patient = await Patient.find({
            reports: {$elemMatch: {status: req.params.status}},
        })
        res.status(200).json({
            success: true,
            data: patient,
        });
}catch(error){
res.status(500).json({
    success: false,
    message: "could not able to featch the reports",
});
}
};