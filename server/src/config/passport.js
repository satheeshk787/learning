const { PrismaClient } = require('@prisma/client');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const UserSchema = require('../models/UserSchema');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;

const User = mongoose.model('User', UserSchema);

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_TOKEN
    },
    async function(jwt_payload, done){
        let id = jwt_payload.payload._id;                
        try{            
            const user = await User.findById(id);            
            if(!user) throw Error("Invalid token");
            done(null, { ...user._doc});
        }catch(err){
            done(err, null);
        }
        
    }
))