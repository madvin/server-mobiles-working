import { Schema, model } from 'mongoose';

const mobileSchema = new Schema({
    date: {
        type: String,
        required: true,
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
        required: [true, "Part Number is required!"],
        minLength: [5, "Part Number should be at least 5 characters long!"],
        maxLength: [22, "Part Number should be less than 20 characters long!"],
    },
});

const Mobile = model('Mobile', mobileSchema);

export default Mobile;