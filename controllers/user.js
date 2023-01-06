import { catchAsyncError } from "../middleware/errorMiddleware.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

export const myProfile =catchAsyncError(async  (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
})

export const logout = catchAsyncError(async  (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            return next(err);
        }

        res.clearCookie('connect.sid');

        res.status(200).json({
            message: 'Logged Out'
        })
    })
})

export const getAdminUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        users
    })
});

export const getAdminStats = catchAsyncError(async (req, res, next) => {
    const usersCount = await User.countDocuments();
    const orders = await Order.find({});

    const preparingOrders = orders.filter((i) => i.orderStatus === 'Preparing');
    const shippedOrders = orders.filter((i)=>i.orderStatus === 'Shipped');
    const deliveredOrders = orders.filter((i) => i.orderStatus === 'Delivered');

    let totalIncome = 0;
    orders.forEach(i => {
        totalIncome+=i.totalAmount;
    })

    res.status(200).json({
        success: true,
        usersCount,
        ordersCount: {
            total: orders.length,
            preparing: preparingOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length
        },
        totalIncome

    })
});