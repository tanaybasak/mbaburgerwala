import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectPassport } from './utils/Provider.js'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { errorMiddleware } from './middleware/errorMiddleware.js';
const app = express();
export default app;


//middleware
dotenv.config({
    path: "./config/config.env",
});

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: process.env.NODE_ENV === 'development' ? false : "none"
    }
}));

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
    extended: true
}))

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
connectPassport();


// Importing Routes
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';

app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);

app.use(errorMiddleware);