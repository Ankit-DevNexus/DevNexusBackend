import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';

let dashboardDB = null;

export const getDashboardDB = async () => {
    if (!dashboardDB) {
        try {
            console.log("DB URI : ", process.env.DASHBOARD_DB_URI);
            
            dashboardDB = await mongoose.createConnection(process.env.DASHBOARD_DB_URI, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
            console.log('Connected to Dashboard DB');
        } catch (error) {
            console.error('Dashboard DB connection error:', error.message);
        }
    }
    return dashboardDB;
};