import Razorpay from "razorpay";
import dotenv from 'dotenv';
dotenv.config();

export const instance = new Razorpay({
    key_id: 'rzp_test_rDq8Em5dOE93Yf',
    key_secret: 'T4CPXwArHrXjp9Zqa04UMwKy'
})