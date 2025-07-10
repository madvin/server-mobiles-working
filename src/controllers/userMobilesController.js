import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorHandler.js";
import mobileService from "../services/mobileService.js";
import User from "../models/User.js";
import Mobile from "../models/Mobile.js";

const userMobilesController = Router();

userMobilesController.get('/usermobiles', isAuth, (req, res) => {
    res.render('userMobiles')
});

userMobilesController.post('/usermobiles', isAuth, async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.render('userMobiles', {
                error: 'User not found',
                user: null,
                mobiles: [],
                mobileCount: 0
            });
        }

        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const dateLimitStr = thirtyDaysAgo.toISOString().split('T')[0];

        const mobiles = await Mobile.find({
            creator: user._id,
            date: { $gte: dateLimitStr }
        }).sort({ date: -1 });

        res.render('userMobiles', {
            user,
            mobiles,
            mobileCount: mobiles.length
        });

    } catch (err) {
        res.render('userMobiles', {
            error: getErrorMessage(err),
            user: null,
            mobiles: [],
            mobileCount: 0
        });
    }
});


export default userMobilesController;