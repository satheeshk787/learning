const { default: mongoose, Schema } = require("mongoose");

const ListSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    }
});
module.exports = ListSchema;