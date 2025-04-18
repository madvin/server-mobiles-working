import { Router } from "express";
import authService from "../services/authService.js";
import mobileService from "../services/mobileService.js";

const creator = Router();

creator.get('/creators', async (req, res) => {
  const mobiles = await mobileService.getAll();

  res.render('creators', { mobiles });
  console.log(mobiles);
});

export default creator;
