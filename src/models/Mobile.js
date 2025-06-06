import { Schema, model } from 'mongoose';

const mobileSchema = new Schema({
    date: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid date format!`
        },
        required: [true, 'Date is required!']
    },
    bulgaria: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 100000 
    },
    macedonia: { 
        type: Number,  
        default: 0, 
        min: 0, 
        max: 100000 
    },
    serbia: { 
        type: Number,  
        default: 0, 
        min: 0, 
        max: 100000 
    },
    romania: { 
        type: Number,  
        default: 0, 
        min: 0, 
        max: 100000 
    },
    greece: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 100000
    },
    partNo: {
        type: String,
        match: [/^[^oO]*$/, 'Username cannot contain the letters "o" or "O"'],
        required: [true, "Part Number is required!"],
        minLength: [10, "Part Number should be at least 10 characters long!"],
        maxLength: [22, "Part Number should be less than 22 characters long!"],
        set: v => v.toUpperCase()
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Mobile = model('Mobile', mobileSchema);
export default Mobile;
