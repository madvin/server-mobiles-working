import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorHandler.js";
import mobileService from "../services/mobileService.js";
import User from "../models/User.js";
import Mobile from "../models/Mobile.js";

const userMobilesController = Router();

userMobilesController.get('/', isAuth, (req, res) => {
    res.render('userMobiles')
});

userMobilesController.post('/', isAuth, async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.render('userMobiles', {
                error: 'User not found',
                user: null,
                mobiles: [],
                mobileCount: 0,
                submittedUsername: username
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

        const totalMobileCount = mobiles.reduce((total, mobile) => {
            return total +
                (mobile.bulgaria || 0) +
                (mobile.macedonia || 0) +
                (mobile.serbia || 0) +
                (mobile.romania || 0) +
                (mobile.greece || 0);
        }, 0);

        res.render('userMobiles', {
            user,
            mobiles,
            mobileCount: totalMobileCount,
            submittedUsername: username
        });

    } catch (err) {
        res.render('userMobiles', {
            error: getErrorMessage(err),
            user: null,
            mobiles: [],
            mobileCount: 0,
            submittedUsername: username
        });
    }
});

export default userMobilesController;