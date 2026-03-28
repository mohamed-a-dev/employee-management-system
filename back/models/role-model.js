import mongoose from "mongoose";

const permissionsSchema = new mongoose.Schema({
    createEmployee: {
        type: Boolean,
        default: false
    },
    editEmployee: {
        type: Boolean,
        default: false
    },
    deleteEmployee: {
        type: Boolean,
        default: false
    },
    createTask: {
        type: Boolean,
        default: false
    },
    editTask: {
        type: Boolean,
        default: false
    },
    deleteTask: {
        type: Boolean,
        default: false
    },
    viewDashboard: {
        type: Boolean,
        default: false
    }
});

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    permissions: permissionsSchema
}, { timestamps: true });

export default mongoose.model("roles", roleSchema);