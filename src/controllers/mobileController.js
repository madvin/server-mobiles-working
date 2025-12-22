import { Router } from "express";
import { getDate, isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorHandler.js";
import mobileService from "../services/mobileService.js";

const mobileController = Router();

mobileController.get("/create", isAuth, getDate, (req, res) => {
  res.render("mobiles/create");
});

mobileController.post("/create", isAuth, getDate, async (req, res) => {
  const mobileData = req.body;
  const today = req.today;
  const userId = req.user?.id;

  try {
    const { mobile, isNew } = await mobileService.upsertMobileByPartNoAndDate({
      ...mobileData,
      date: today,
      creator: userId
    });

    const message = isNew ? 'Mobile created successfully.' : 'Mobile updated with new values.';
    console.log(message);
    res.redirect('/mobiles/create');
  } catch (err) {
    return res.render("mobiles/create", {
      mobile: mobileData,
      error: getErrorMessage(err),
    });
  }
});



export default mobileController;
