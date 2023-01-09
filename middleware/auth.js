import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = (req, res, next) => {

    const token = req.cookies['connect.sid'];
    if(!token) {
        return next(new ErrorHandler('Not Logged In', 401));
    }
    next();
}



export const authorizeAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return next(new ErrorHandler('Only admin is allowed to access this resource', 405));
    }
    next();
}