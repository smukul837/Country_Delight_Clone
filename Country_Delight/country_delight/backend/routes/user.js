const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const secretKey = 'yourSecretKey'; // Replace with your actual secret key

router.post('/create_user', 
        body('email', 'Incorrect Email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 }), async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try{
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword
        })
        res.json({success:true});
        console.log("Data Created Successfully!!")
    } catch (error) {
        console.log(error);
        res.json({success:false});
        console.log("Data Created failed!!")
    }
})

router.post('/login_user', 
        body('email', 'Incorrect Email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 }), async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    let  email = req.body.email;
    try{
       let userData = await User.findOne({ email});
       if(!userData){
        return res.status(400).json({ errors: "Try loggin with correct credentials" });
       }
       const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
       if (!isPasswordValid) {
         return res.status(400).json({ errors: "Try loggin with correct credentials" });
       }
       const payload = { user_id: userData.id };
       const token = jwt.sign(payload, secretKey);
        return res.json({ success:true, authtoken:token , userData:userData});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;