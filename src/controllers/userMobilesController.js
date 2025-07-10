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

userMobilesController.post('/usermobiles', isAuth, async (req, res) => {
    try {
        const { userName } = req.body;
        const user = await User.findOne({ username: userName }).populate('mobiles').exec();

        if (!user) {
            return res.status(404).render('userMobiles', { error: 'User not found', mobiles: [] });
        }

        res.render('userMobiles', { mobiles: user.mobiles, user });
    } catch (err) {
        res.status(500).render('userMobiles', {
            error: getErrorMessage(err),
            mobiles: [],
        });
    }
});



});

export default userMobilesController;


