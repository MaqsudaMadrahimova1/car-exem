const { Schema, model } = require("mongoose");

const AuthSchema = new Schema({

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

module.exports = model("Auth", AuthSchema);