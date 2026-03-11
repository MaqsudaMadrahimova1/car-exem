const { Router } = require("express");
const {createCategory,getAllCategories, getCategoryById, updateCategory, deleteCategory} = require("../controller/category.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const categoryValidator = require("../validator/category.validate");

const categoryRouter = Router();
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/create", authMiddleware, validate(categoryValidator), createCategory);
categoryRouter.put("/:id", authMiddleware, validate(categoryValidator), updateCategory);
categoryRouter.delete("/:id", authMiddleware, deleteCategory);

module.exports = categoryRouter;