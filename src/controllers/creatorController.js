import { Router } from 'express';
import authService from '../services/authService.js';

const creator = Router();

creator.get('/creators', async (req, res) => {
    const creators = await authService.getAllUsers();
    res.render('creators', { creators });
}
);

export default creator;
