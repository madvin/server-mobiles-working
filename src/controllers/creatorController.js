import { Router } from "express";
import { isAuth } from '../middlewares/authMiddleware.js';
import mobileService from "../services/mobileService.js";

const creator = Router();

creator.get('/creators', isAuth, async (req, res) => {
  const mobiles = await mobileService.getAllByCreator();

  res.render('creators', { mobiles });
});

export default creator;
