import { Router } from 'express';
import mobileService from '../services/mobileService.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get ('/', isAuth, async (req, res) => {

    if (isAuth) {
        const mobiles = await mobileService.getAll();

    return res.render('home', { mobiles });

    }
    res.redirect('auth/login')
    
});

export default router;