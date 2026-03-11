const { Schema, model } = require("mongoose");

const Auth = new Schema({

    username: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: [3, "fullName kamida 3 tadan kam  bo'lishi kerak"],
        maxlength: [50, "fullName 50 dan  uzun bo'lmasligi kerak"],
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        
    },
    password: { 
        type: String, 
        required: true 
    },

    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    isVerified: { 
        type: Boolean,
        default: false 
    },

    otp: { 
        type: String, 
        default: null 
    },
    otpTime: { 
        type: Number, 
        default: 0 
    },
    avatar: { 
        type: String, 
        default: "" 
    },
    bio: { 
        type: String, 
        default: "" 
    }
}, { 
    versionKey: false, 
    timestamps: true 
});
const AuthSchema = model("auth", Auth)
module.exports = AuthSchema