const express = require('express');
const router = require('./routes/routes');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
require('./config/passport');
const passport = require('passport');
const app = express();
const mongoose  = require('mongoose');
const cors = require('cors');
var CryptoJS = require("crypto-js");
const UserSchema = require('./models/UserSchema');
const { ObjectId } = require('mongodb');
mongoose.connect(process.env.MONGO_CONNECTION).then(() => console.log("DB Connected!") ).catch(err => console.log("error", err));
const port = 8081;
// UserSchema
const User = mongoose.model('User', UserSchema);


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  // Enable CORS with specific options
  app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(passport.initialize());

// app.post('/insert', async (req, res) => {
//     const newUser = new User({
//         name: "Satheesh",
//         email: "satheesh@gmail.com",
//         password: "Admin@019",
//         type: "Admin"
//     });
//     await newUser.save();

//     res.send(newUser);
// });
app.post('/update', async (req, res) => {
    const userId = '6516c5ec0820b8c434f33350'; // Replace this with the actual user ID
    const hashedPassword = CryptoJS.HmacSHA1("Admin@019", process.env.PASSWORD_KEY).toString(CryptoJS.enc.Hex);

    try {
        const newUser = await User.updateOne(
            { _id: new ObjectId(userId) }, // Use new ObjectId here
            {
                $set: {
                    name: "Satheesh",
                    email: "satheesh@gmail.com",
                    password: hashedPassword,
                    type: "Admin"
                }
            }
        );

        res.send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});






app.use('/api', passport.authenticate('jwt', { session: false, failWithError: true }), (err, req, res, next)=>{
    res.status(401).json({
        success: false,
        message: "Invalid token"
    });
});

app.use('/api', router);

app.use('/auth', authRouter);

app.listen(port, () => {        
    console.log(`Server started on ${port}`);
});


/**
 * 
 * seed username and password - 
 * encrypt password 
 * Create login method in login controller
 * add route login
 * create validation for login
 * if successfully logged then return jwt token - use jsonwebtoken, jwt token must contain id
 * update passport.js file with actual login
 * 
 */