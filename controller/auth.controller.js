const CustomErrorHandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const bcrypt = require("bcrypt");


const register = async (req,res) => {
    try{
        const {username,email,password}=req.body
        const foundedUser = await AuthSchema.findOne({email})

        if(foundedUser){
            throw CustomErrorHandler.BadRequest("User already exits")

        }
      const hashPassword = await bcrypt.hash(password,12)
      const code = Array.from({length: 6}, () => (Math.round() * 6)).join("")
      const newUser = await AuthSchema.create({
        username,
        email,
        password: hashPassword,
        otp: code,
        otpTime: Date.now() + 120000 
    });
    res.status(201).json({
        message: "User registered. Please verify your email.",
        otp: code 
});
      }catch (error) { 
    next(error); 
}
};
const verify = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await AuthSchema.findOne({ email });
        if (!user) {
            return next(CustomErrorHandler.NotFound("User not found"));
        }

        if (user.otp !== otp) {
            return next(CustomErrorHandler.BadRequest("wrong otp"));
        }
        if (user.otpTime < Date.now()) {
            return next(CustomErrorHandler.BadRequest("otp not limit"));
        }
        user.isVerified = true;
        user.otp = null;
        user.otpTime = null;
        await user.save();

        res.status(200).json({
            message: "Succses"
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user.id; 
        const updatedUser = await AuthSchema.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password -otp -otpTime");

        if (!updatedUser) {
            return next(CustomErrorHandler.NotFound("User not found"));
        }

        res.status(200).json({
            message: "Update profile",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};


module.exports = 
{ register, 
  verify, 
updateProfile 
};