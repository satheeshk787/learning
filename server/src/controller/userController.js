const jwt = require('jsonwebtoken');
const UserSchema = require("../models/UserSchema");
const { default: mongoose } = require('mongoose');
const User = mongoose.model('User', UserSchema);
const CryptoJS = require('crypto-js');

class userController {

    static async login (req, res) {
        try{
            req.body.password = CryptoJS.HmacSHA1(req.body.password, process.env.PASSWORD_KEY).toString(CryptoJS.enc.Hex);
            const user = await User.findOne(req.body);
            if(!user){
                return res.json({
                    success: false,
                    message: "Invalid username or password"
                });
            }
            const JwtToken = jwt.sign({payload: { 
                _id: user._id,
                name: user.name,
            }}, process.env.JWT_TOKEN);
            return res.json({
                success: true,
                token: `Bearer ${JwtToken}`,                
            });
            
        }catch(err){
            res.status(500).json({ error: true });
        }
    }

    static async userInfo (req, res) {
        try{            
            const user = await User.findOne(req.body);                                    
            if(!user){
                return res.json({
                    success: false,
                    message: "Invalid username or password"
                });
            }
            const JwtToken = jwt.sign({payload: { 
                _id: user._id,
                name: user.name,
            }}, process.env.JWT_TOKEN);
            return res.json({
                success: true,
                token: `Bearer ${JwtToken}`,                
            });
            
        }catch(err){
            res.status(500).json({ error: true });
        }
    }

    static async userInfo (req, res) {
        try{
            const user = await User.findOne(req.body)
                .select('_id')
                .select('name')
                .select('email');
            return res.json({
                success: true,
                user
            });

        }catch(err){
            res.status(500).json({ error: true, err });
        }
    }
}

module.exports = userController;