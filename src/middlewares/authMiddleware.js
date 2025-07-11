import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;


export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);

        if (decodedToken.username) {
            decodedToken.username =
                decodedToken
                .username
                .charAt(0)
                .toUpperCase() + decodedToken.username.slice(1);
        }
        req.user = decodedToken;
        res.locals.user = decodedToken;
        
        next();
    } catch(error) {
        res.setError('Invalid Authentication!');
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        // res.setError('You must be logged in in order to do that!')
        return res.redirect('/auth/login');
    } 

    next();
};

export const getDate = (req, res, next) => {
    req.today = new Date().toISOString().split('T')[0];
    next();
}
