import express from 'express'
import {
    emailVerification,
    forgetPassword,
    confirmOTP,
    newUser,
    login,
    setNewPassword,
    getMyProfile,
    logOut,
    uploadUserPhoto,
    resizeUserPhoto,
    updateCart
} from '../controller/userController.js'
import { isAuthenticated } from '../middlewares/auth.js';
import { otpValidator, validate } from '../lib/validator.js';

const router = express.Router();

router.post('/verifyOTP', otpValidator(), validate, confirmOTP);

// user must not be logged in
// router.post('/verifyEmail', emailValidator(), validate, emailVerification);
router.post('/verifyEmail', emailVerification);
router.post('/new', uploadUserPhoto, resizeUserPhoto, newUser);
router.post('/login', login);
router.post('/forgetPassword', forgetPassword);
router.post('/setPassword', setNewPassword);

// user must be logged in
router.use(isAuthenticated); 
router.get("/me", getMyProfile);
router.get("/logOut", logOut);
router.put("/updateCart", updateCart);

export default router;