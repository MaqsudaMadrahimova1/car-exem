const { Router } = require("express");
const { register, verify, login, logout, refreshToken, changePassword,forgotPassword, updateProfile} = require("../controller/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema, profileUpdateSchema } = require("../validator/auth.validate");

const authRouter = Router();
authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/verify", verify);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/refresh", refreshToken);
authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/logout", authMiddleware, logout);
authRouter.post("/change-password", authMiddleware, changePassword);
authRouter.put("/profile", authMiddleware, validate(profileUpdateSchema), updateProfile);

module.exports = authRouter;