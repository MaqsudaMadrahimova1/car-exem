const { Schema, model, Types } = require("mongoose");

const Machine = new Schema({
    // Mashina nomi (Rasmda: Tahoe, Damas Van, Nexia)
    name: { 
        type: String, 
        required: [true, "Mashina nomi kiritilishi shart"], 
        trim: true 
    },
    brand: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: [true, "Narxi ko'rsatilishi shart"] 
    },

    image: { 
        type: String, 
        required: true 
    },

    categoryId: { 
        type: Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    addedBy: { 
        type: Types.ObjectId, 
        ref: "Auth", 
        required: true 
    }
}, { 
    versionKey: false, 
    timestamps: true 
});

const MachineSchema = model("machine", Machine)
module.exports = MachineSchema