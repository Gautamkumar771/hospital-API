const mongoose =require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "please Enter patient name"],
        unique: true,
    },
   
         // Define the 'status' field with type String, required, and limited to specific values using 'enum'
            status: {
                type: String,
                required:true,
                enum: ["negative", "travelled-Qurantine", "Sysmptoms-Quarantine", "positive-Admin"],
            },
           
    // Define the 'doctor' field as a reference to another 'Doctor' collection using ObjectId
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",// Refers to the 'Doctor' model
        required: true,
    },
});
// Create a Mongoose model based on the 'patientSchema' for the 'Patient' collection
const patient = mongoose.model('Patient', patientSchema);

module.exports = patient;