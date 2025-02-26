import { Schema, model } from 'mongoose';

const mobileSchema = new Schema({
    date: {
        type: String,
    },
    bulgaria: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 100000 
    },
    macedonia: { 
        type: String,  
        default: 0, 
        min: 0, 
        max: 100000 
    },
    serbia: { 
        type: String,  
        default: 0, 
        min: 0, 
        max: 100000 
    },
    romania: { 
        type: String,  
        default: 0, 
        min: 0, 
        max: 100000 
    },
    greece: { 
        type: String, 
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