import { Router } from "express";
import { getDate, isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorHandler.js";
import mobileService from "../services/mobileService.js";
import User from "../models/User.js";

const userMobilesController = Router();

userMobilesController.get('/usermobiles', isAuth, (req, res) => {
    res.render('userMobiles')
});

userMobilesController.post('/usermobiles', isAuth, async (req, res) => {

    const { userName } = req.body;

    const user = await User.findOne({ userName }).populate('mobiles').exec();

    // TODO: implement the logic of the controller!


});

export default userMobilesController;


