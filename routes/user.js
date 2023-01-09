import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { getAdminStats, getAdminUsers, logout, myProfile } from '../controllers/user.js';
import { authorizeAdmin, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();


dotenv.config({
    path: "./config/config.env",
});

router.get('/googlelogin', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login', passport.authenticate('google', {
    successRedirect: `${process.env.FRONTEND_URL}/home`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
})
);

router.get('/logout', logout);
router.get('/me', isAuthenticated, myProfile);
router.get('/admin/users', isAuthenticated, authorizeAdmin, getAdminUsers);
router.get('/admin/stats', isAuthenticated, authorizeAdmin, getAdminStats);
export default router;