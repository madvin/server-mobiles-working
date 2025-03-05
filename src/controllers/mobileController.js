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
  const creator = req.user.id;
  console.log(creator);
  

  try {
    await mobileService.createMobile({ date: today, ...mobileData, creator });
    return res.redirect("/");
  } catch (err) {
    return res.redirect("/create", {
      mobile: req.body,
      error: getErrorMessage(err),
    });
  }
});

export default mobileController;
