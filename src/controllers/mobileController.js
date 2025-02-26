import { Router } from 'express';
import { getDate, isAuth  } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorHandler.js';
import mobileService from '../services/mobileService.js';

const mobileController = Router();

mobileController.get('/create', isAuth, getDate, (req, res) => {
    res.render('mobiles/create');
});

mobileController.post('/create', isAuth, getDate, async (req, res) => {
    const mobileData = req.body;
    const today = req.today;

    try {
        await mobileService.createMobile({ date: today, ...mobileData });
        res.render('/');
    } catch (err) {
        return res.render('mobiles/create', { mobile: req.body, error: getErrorMessage(err) });
    }
});

export default mobileController;