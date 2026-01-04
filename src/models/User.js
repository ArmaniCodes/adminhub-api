const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    role:{type: String, enum:['admin','support','viewer'],default:'viewer'},
    status:{type: String, enum:['active','suspended'], default:'active'},
});

new mongoose.Schema({
    timestamps: true}
)

module.exports = mongoose.model('User', userSchema);