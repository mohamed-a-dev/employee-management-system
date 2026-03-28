import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            lowercase: true,
            required: [true, 'Please provide title'],
            trim: true,
            minlength: [3, 'Task title must be more than 2 characters'],
            maxlength: [40, 'Task title must be less than 41 characters'],
        },

        description: {
            type: String,
            required: [true, 'Please provide description'],
            minlength: [3, 'Description must be more than 2 characters'],
            maxlength: [800, 'Description must be less than 200 characters'],
            lowercase: true,
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "employees",
            required: [true, "Task must be assigned to an employee"]
        },

        status: {
            type: String,
            enum: ['pending', 'in progress', 'completed'],
            default: 'pending'
        },
        
        creator: {
            type: String,
        },

        deadline: {
            type: Date,
            required: [true, 'Enter task deadline date'],
        }

    },
    { timestamps: true }
);



taskSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    const saltKey = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltKey);
});


taskSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
}


taskSchema.methods.createToken = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '3d' });
}




export default model('tasks', taskSchema)
