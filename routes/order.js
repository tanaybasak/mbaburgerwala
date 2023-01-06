import express from 'express';
import passport from 'passport';
import { getAdminOrders, getOrderDetails, getMyOrders, paymentVerification, placeOrder, placeOrderOnline, processOrder } from '../controllers/order.js';
import { authorizeAdmin, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();
router.post('/createorder', placeOrder);
router.post('/createorderonline',placeOrderOnline);
router.post('/paymentverification', paymentVerification);

router.get('/myorders', isAuthenticated, getMyOrders);
router.get('/order/:id', isAuthenticated, getOrderDetails);

//Add admin middleware
router.get('/admin/orders', isAuthenticated, authorizeAdmin, getAdminOrders);
router.get('/admin/order/:id', isAuthenticated, authorizeAdmin, processOrder);

export default router;