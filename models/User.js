const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '{PATH} sahesini bos qoyma'],
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },

});

module.exports = Model('user', UserSchema);