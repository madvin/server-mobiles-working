import { Router } from 'express';
import mobileService from '../services/mobileService.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get ('/', isAuth, async (req, res) => {

    if (!isAuth) {
        return res.render('login')
    }
    const mobiles = await mobileService.getAll();
    return res.render('home', { mobiles });
    
});

export default router;