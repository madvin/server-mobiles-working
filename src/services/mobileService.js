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

    async getAllByCreator() {
        try {
            const mobile = Mobile.find().populate('creator');
            return mobile;
        } catch(error) {
            throw new Error('Error fetching mobiles: ' + error.message);
        }
    },

    async getAll() {
        try {
            const mobiles = await Mobile.find().populate('creator');
    
            // Group data by date & partNo
            const groupedMobiles = mobiles.reduce((acc, mobile) => {
                const { date, partNo, bulgaria, macedonia, serbia, romania, greece} = mobile;
                const key = `${date}-${partNo}`; // Unique key based on date & partNo
                
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
    
                // Merge numerical values by adding them
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
    async getMobileByDate(date) {
        try {
            const mobiles = await Mobile.find({ date: date });
            if (!mobiles.length) {
                throw new Error('No mobiles found for the given date');
            }
            return mobiles;
        } catch (error) {
            throw new Error('Error fetching mobile by date: ' + error.message);
        }
    }
    
}


