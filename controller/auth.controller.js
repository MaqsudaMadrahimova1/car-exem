const CustomErrorHandler = require("../error/custom-error.handler");
const AuthSchema = require("../schema/auth.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const foundedUser = await AuthSchema.findOne({ email });

        if (foundedUser) {
            return next(CustomErrorHandler.BadRequest("User already exists"));
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await AuthSchema.create({
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
    } catch (error) {
        next(error);
    }
};

const verify = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const user = await AuthSchema.findOne({ email });
        if (!user) return next(CustomErrorHandler.NotFound("User not found"));

        if (user.otp !== otp) return next(CustomErrorHandler.BadRequest("Wrong OTP"));
        if (user.otpTime < Date.now()) return next(CustomErrorHandler.BadRequest("OTP expired"));

        user.isVerified = true;
        user.otp = null;
        user.otpTime = null;
        await user.save();

        res.status(200).json({ message: "Success" });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await AuthSchema.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(CustomErrorHandler.BadRequest("Email yoki parol noto'g'ri"));
        }

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Welcome", accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return next(CustomErrorHandler.Unauthorized("Token topilmadi"));

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

        res.status(200).json({ accessToken });
    } catch (error) {
        next(CustomErrorHandler.Unauthorized("Token yaroqsiz"));
    }
};

const logout = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await AuthSchema.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return next(CustomErrorHandler.BadRequest("Eski parol xato"));

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const user = await AuthSchema.findOne({ email });
        if (!user) return next(CustomErrorHandler.NotFound("User topilmadi"));

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        next(error);
    }
};
const getProfile = async (req, res, next) => {
    try {
        const user = await AuthSchema.findById(req.user.id).select("-password");
        let data = { user };
        if (user.role === 'admin') {
            const Machine = require("../schema/machine.schema");
            const Category = require("../schema/category.schema");
            
            data.myMachines = await Machine.find({ addedBy: user._id });
            data.myCategories = await Category.find({ addedBy: user._id });
        }
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const updatedUser = await AuthSchema.findByIdAndUpdate(
            req.user.id,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password -otp -otpTime");

        res.status(200).json({ message: "Update profile", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    register,
     verify, 
     login, 
     logout, 
    refreshToken, 
    changePassword, 
    forgotPassword,
    getProfile,
    updateProfile
};