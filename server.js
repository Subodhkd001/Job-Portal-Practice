// imports
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';

 
import connectDB from './config/db.js'
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoute from './routes/jobsRoute.js'

// config
dotenv.config();

// connect to database
connectDB();

// rest object
const app = express();

//* Middlewares
// Middleware to parse JSON request body
app.use(express.json());   // agar ye nahi hota to req accept nahi hoti client se

// Middleware to parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(morgan('dev'))



// routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.use("/api/v1/job", jobsRoute)

// validation middleware
app.use(errorMiddleware)

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`);
})