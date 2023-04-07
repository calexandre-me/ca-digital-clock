// const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 3,
        maxlength: 15,
        validate(value){
            if(!isNaN(value[0])){
                throw new Error("Name must start with a letter.");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 12,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 25,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Do not incluede the word password.");
            }
        }
    }
    // ,
    // tokens: [ 
    //     {
    //         token : {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
    //,
    // avatar: {
    //     type: Buffer,
    //     default: ''
    // }
},
{
    timestamps: true
}
);

UserSchema.statics.findByCredentials = async function(email, password){
    const user = await UserModel.findOne({email});

    if(!user){
        throw new Error('User does not exist.');
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if(!checkPass){
        throw new Error("Invalid password")
    }

    return user;
};

UserSchema.pre('save', async function(next){
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    return next()
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;