const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/users');
//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 email_address: {
   type: String,
         required: true,
         unique: true,
         lowercase: true,
         validate: value => {
             if (!validator.isEmail(value)) {
                 throw new Error({error: 'Invalid Email address'})
             }
         }
 },
 password: {
  type: String,
  trim: true,
  required: true
},
tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});
// hash user password before saving into database
// UserSchema.pre('save', function(next){
//   this.password = bcrypt.hashSync(this.password, saltRounds);
//   next();
// });

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, "WinterIsComingGOT2019");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

UserSchema.statics.findByCredentials = async (email_address, password) => {
    // Search for a user by email and password.
    console.log(email_address);
    console.log(password);
    const user = await User.findOne({ email_address } );
    console.log("Query 1");
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    console.log("Query 2");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Query 3");
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
