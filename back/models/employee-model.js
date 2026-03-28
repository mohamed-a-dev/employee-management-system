import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose;

const employeeSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [40, 'Username must be less than 41 characters'],
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [20, 'Password must be less than 21 characters'],
    },

    phone: {
        type: String,
        required: [true, 'Enter employee phone number'],
    },
    address: {
        type: String,
        required: [true, 'Enter employee address'],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    },

    status: {
        type: String,
        required: [true, 'Enter employee status'],
        lowercase: true,
    }

}, { timestamps: true });


employeeSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    const saltKey = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltKey);
});


employeeSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
}


employeeSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, username: this.username, roleId: this.role }, process.env.JWT_SECRET, { expiresIn: '3d' });
}




export default model('employees', employeeSchema)
