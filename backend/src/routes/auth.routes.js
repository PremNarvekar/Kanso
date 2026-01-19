import express from "express"
import { register, loginUser, logout, me, updateAvatar } from "../controller/authController.js"


const router = express.Router()


router.post('/register', register)

router.post("/login", loginUser)

router.get('/me', me)

router.put('/avatar', updateAvatar)

router.get('/logout', logout)


import passport from '../config/passport.js';
import { cookieparser } from '../config/config.js';

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        // Successful authentication, redirect home.
        // The user/token is in req.user because of our custom callback in strategy? 
        // Wait, typical passport strategy returns user to req.user.
        // In our config, we returned { user, token }.
        const { user, token } = req.user;

        res.cookie("accessToken", token, cookieparser);
        // Redirect to frontend
        res.redirect('http://localhost:5173');
    });

export default router

