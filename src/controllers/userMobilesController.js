import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorHandler.js";
import mobileService from "../services/mobileService.js";
import User from "../models/User.js";
import Mobile from "../models/Mobile.js";

const userMobilesController = Router();

userMobilesController.get('/', isAuth, (req, res) => {
    res.render('userMobiles', { user: req.user, submittedDdaysCount: 31 });
});

userMobilesController.post('/', isAuth, async (req, res) => {
    try {
        const { username } = req.body;
        let daysCount = parseInt(req.body.daysCount) || 31;
        if (daysCount < 1) daysCount = 1;

        const searchedUser = await User.findOne({ username });

        if (!searchedUser) {
            return res.render('userMobiles', {
                error: 'User not found',
                user: req.user,
                searchedUser: null,
                mobiles: [],
                mobileCount: 0,
                submittedUsername: username
            });
        }

        const today = new Date();
        const daysAgo = new Date(today);
        daysAgo.setDate(today.getDate() - daysCount);

        const dateLimitStr = daysAgo.toISOString().split('T')[0];

        const mobiles = await Mobile.find({
            creator: searchedUser._id,
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
            user: req.user, 
            searchedUser,
            mobiles,
            mobileCount: totalMobileCount,
            submittedUsername: username,
            submittedDaysCount: daysCount
        });

    } catch (err) {
        res.render('userMobiles', {
            error: getErrorMessage(err),
            user: req.user,
            searchedUser: null,
            mobiles: [],
            mobileCount: 0,
            submittedUsername: username,
            submittedDaysCount: daysCount
        });
    }
});


export default userMobilesController;