import { Router } from 'express';
import mobileService from '../services/mobileService.js'

const router = Router();

router.get ('/', async (req, res) => {
    const mobiles = await mobileService.getAll();

    res.render('home', { mobiles });
});

export default router;