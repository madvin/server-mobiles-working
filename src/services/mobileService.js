import Mobile from '../models/Mobile.js';
import User from '../models/User.js';

export default {
    async createMobile(mobileData) {
        try {
            const mobile = await Mobile.create({
                ...mobileData
            });

            if (mobile.creator) {
                await User.findByIdAndUpdate(mobile.creator, {
                    $push: { mobiles: mobile._id }
                });
            }

            return mobile;
        } catch (error) {
            throw new Error('Error creating mobile: ' + error.message);
        }
    },
    async getMobileById(id) {
        try {
            const mobile = await Mobile.findById(id);

            if (!mobile) {
                throw new Error('Mobile not found');
            }
            return mobile;
        } catch (error) {
            throw new Error('Error fetching mobile: ' + error.message);
        }
    },
    async updateMobile(id, data) {
        try {
            const mobile = await Mobile.findByIdAndUpdate(id, data, { new: true, runValidators: true });
            if (!mobile) {
                throw new Error('Mobile not found');
            }
            return mobile;
        } catch (error) {
            throw new Error('Error updating mobile: ' + error.message);
        }
    },

    async deleteMobile(id) {
        try {
            const mobile = await Mobile.findByIdAndDelete(id);
            if (!mobile) {
                throw new Error('Mobile not found');
            }
            return mobile;
        } catch (error) {
            throw new Error('Error deleting mobile: ' + error.message);
        }
    },

    async getAllPhonesOfUser(userId) {
        const user = await User.findOneById(userId);

        try {
            user
            .populate('mobiles')
            .sort({ date: -1 });
        } catch(error) {
            throw new Error('Cannot fetch data: ' + error.message);
        }

    },

    async getAllByCreator() {
        try {
            const mobile = Mobile.find()
            .populate('creator')
            .sort({ date: -1 });
            return mobile;
        } catch (error) {
            throw new Error('Error fetching mobiles: ' + error.message);
        }
    },

 async getAll() {
    try {
        const mobiles = await Mobile.find()
            .populate('creator')
            .sort({ date: -1 });

        const groupedMobiles = mobiles.reduce((acc, mobile) => {
            const { date, partNo, bulgaria, macedonia, serbia, romania, greece } = mobile;
            const key = `${date}-${partNo}`;

            if (!acc[key]) {
                acc[key] = {
                    date,
                    partNo,
                    creator: mobile.creator,
                    bulgaria: 0,
                    macedonia: 0,
                    serbia: 0,
                    romania: 0,
                    greece: 0
                };
            }

            acc[key].bulgaria += bulgaria ? Number(bulgaria) : 0;
            acc[key].macedonia += macedonia ? Number(macedonia) : 0;
            acc[key].serbia += serbia ? Number(serbia) : 0;
            acc[key].romania += romania ? Number(romania) : 0;
            acc[key].greece += greece ? Number(greece) : 0;

            return acc;
        }, {});

        return Object.values(groupedMobiles);
    } catch (error) {
        throw new Error('Error fetching mobiles: ' + error.message);
    }
},

    async upsertMobileByPartNoAndDate(data) {
        const { partNo, date, bulgaria = 0, macedonia = 0, serbia = 0, romania = 0, greece = 0, creator } = data;

        try {
            const existing = await Mobile.findOne({ partNo, date, creator });

            if (existing) {
                existing.bulgaria += Number(bulgaria);
                existing.macedonia += Number(macedonia);
                existing.serbia += Number(serbia);
                existing.romania += Number(romania);
                existing.greece += Number(greece);

                const updated = await existing.save();
                return { mobile: updated, isNew: false };
            } else {
                const mobile = await Mobile.create({
                    partNo,
                    date,
                    bulgaria,
                    macedonia,
                    serbia,
                    romania,
                    greece,
                    creator
                });


                if (creator) {
                    await User.findByIdAndUpdate(creator, {
                        $push: { mobiles: mobile._id }
                    });
                }

                return { mobile, isNew: true };
            }
        } catch (error) {
            throw new Error('Error upserting mobile: ' + error.message);
        }
    }
}


