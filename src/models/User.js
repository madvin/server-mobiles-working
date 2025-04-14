import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [5, 'Username should be at least 5 characters!'],
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: [6, 'Password should be at least 6 characters!'],
        trim: true,
    },
    mobiles: [{
        type: Schema.Types.ObjectId,
        ref: 'Mobile',
    }],
});

userSchema.virtual('rePassword')
    .set(function(rePassword) {
        if (rePassword !== this.password) {
            throw new Error('Password missmatch!');   
        }
    });

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;