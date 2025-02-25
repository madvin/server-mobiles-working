import Mobile from '../models/Mobile.js';

export default {
    async createMobile(mobileData) {
        try {
            const mobile = await Mobile.create(mobileData);
            return mobile;
        } catch(error) {
            throw new Error ('Cannot write data!' + error.message)
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

    async getAll() {
        try {
            const mobiles = await Mobile.find();
            return mobiles;
        } catch (error) {
            throw new Error('Error fetching mobiles: ' + error.message);
        }
    }
}
