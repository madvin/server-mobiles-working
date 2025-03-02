import { Router } from 'express';
import authService from '../services/authService.js';
import mobileService from '../services/mobileService.js';

const creator = Router();

creator.get('/creators', async (req, res) => {
    const creators = await authService.getAllUsers();
    const mobiles = await mobileService.getAll();
    res.render('creators', { creators, mobiles });
}
);

export default creator;
