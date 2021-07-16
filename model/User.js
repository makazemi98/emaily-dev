const mongoose = require('mongoose');

const {Schema} = mongoose
const { Types } = Schema;

const userSchema = new Schema({
    googleId: Types.String
})


mongoose.model('users', userSchema)