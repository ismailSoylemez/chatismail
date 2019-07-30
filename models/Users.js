const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreaete = require('mongoose-find-or-create');

const userSchema = new Schema({
    googleID: {
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    ProfilePhotoUrl: String
});


userSchema.plugin(findOrCreaete);
module.exports = mongoose.model('users',userSchema);