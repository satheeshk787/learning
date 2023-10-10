const { default: mongoose, Schema } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    type: {
        type: Schema.Types.String,
        required: true
    },    
});

module.exports = UserSchema;