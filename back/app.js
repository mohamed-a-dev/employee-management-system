import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error-middleware.js';
import employeesRouter from './routes/employee-routes.js'
import tasksRouter from './routes/tasks-routes.js'
import rolesRouter from './routes/role-routes.js'
import dashboardRouter from './routes/dashboard-routes.js'
import authRouter from './routes/auth-routes.js'
import verifyToken from './middleware/verify-token-middlware.js';
import checkPermissions from './middleware/check-permissions-middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
dotenv.config();
app.use(express.json());

app.use('/employees', verifyToken, employeesRouter);
app.use('/tasks', verifyToken, tasksRouter);
app.use('/roles', verifyToken, rolesRouter);
app.use('/dashboard', verifyToken, checkPermissions('viewDashboard'), dashboardRouter);
app.use('/auth', authRouter);

app.use(errorMiddleware)

const runServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        app.listen(5000, "0.0.0.0", () => {
            console.log("Server running on all networks");
        });
    } catch (error) {
        console.log(error);
    }
}

runServer();