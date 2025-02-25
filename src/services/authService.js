import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'BASICSECRET';

export default {
    async register(userData) {
        
            const user = await User.findOne({ username: userData.username });
            if (user) {
                throw new Error ('Username already taken!');
            }
            return User.create(userData);
        },
    async login(username, password) {
        const user = await User.findOne({ username });
        
        if (!user) {
            throw new Error ('Invalid username or passowrd');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error ('Invalid username or password');
        }
        const payload = {
            id: user.id,
            username: user.username,
        }
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        return token;
    }
}; 