const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    // Generate Salt
    const salt = await bcrypt.genSalt(10);
    // Hash Password
    this.password = await bcrypt.hash(this.password, salt);
    // Continue to next method ...
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;