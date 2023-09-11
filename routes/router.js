const express = require("express");
const {registerDoctor, registerPatient, createReport, all_reports, login} = require('../controllers/userController');
const passport = require("passport");
const jwt = require('../config/passport');

const router = express.Router();

router.post('/doctors/register', registerDoctor); 
router.get("/login",login);

router.post('/patients/register',passport.authenticate('jwt',{session: false}), registerPatient);

router.post('/patients/:id/create_report',passport.authenticate('jwt',{session: false}), createReport);
router.post('/patients/:id/all_report', all_reports);

router.get('/reports/:status , AllReports');

module.exports = router;