const mongoose =require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        require:[true, "please Enter Your name"],
    },
    password: {
        type: String, 
        require: [true, "pleade Enter Your password"],
        minLength:[6, "password should be greater than 6 character"],
    },
});

const Doctor =  mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;