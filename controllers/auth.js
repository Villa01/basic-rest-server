const { response } = require("express");
const { compareEncrypted } = require("../helpers/encryption");
const generateJWT = require("../helpers/generate-jwt");
const User = require('../models/user');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try { 

        // Verify if email exists

        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg : 'User / Password are not correct - email'
            })
        }

        // User is active

        if ( !user.state ) {
            return res.status(400).json({
                msg : 'User / Password are not correct - state: false'
            })
        }

        // Verify password
        if (!compareEncrypted(password, user.password)) {
            return res.status(400).json({
                msg : 'User / Password are not correct - password'
            })
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, talk to your administrator'
        });
    }


}


module.exports = {
    login
}