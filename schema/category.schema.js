const {Schema,model} = require("mongoose")

const Category = new Schema({
  modelName: {
    type: String,
    required: true,
    trim: true,
    minLength:[3,"Kamida 3 harf bo'lsinn"],
    maxLength:[60,"Ko'pi bilan 60 ta harf undan ko'p bo'lmaydi o'zi"]
  },
  image: {
   type: String,
   required: true,

  },
  versionKey: false,
    timestamps: true
})
const CategorySchema = model("category", Category)
module.exports = CategorySchema