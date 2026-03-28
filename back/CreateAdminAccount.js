import EmployeesCollection from './models/employee-model.js';
import RolesCollection from './models/role-model.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const adminRole = {
    roleName: 'admin',
    permissions: {
        createEmployee: true,
        editEmployee: true,
        deleteEmployee: true,
        createTask: true,
        editTask: true,
        deleteTask: true,
        viewDashboard: true,
    }
}
const adminAccount = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    username: 'Mohamed Ahmed',
    phone: '01120504015',
    address: 'Egypt/Giza',
    status: 'active',
}

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        const role = await RolesCollection.create(adminRole);
        await EmployeesCollection.create({ ...adminAccount, role: role._id });
        console.log('Created Admin Account Successfully.');
    } catch (error) {
        console.log(error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from Database.');
    }
}

createAdmin();
