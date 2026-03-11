const { Router } = require("express");
const { createCategory, getAllCategories, getCategoryById, deleteCategory} = require("../controller/category.controller");

const authMiddleware = require("../middleware/auth.middleware"); 
const validate = require("../middleware/validate.middleware"); 
const categoryValidator = require("../validator/category.validator");

const categoryRouter = Router();
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post(
    "/create", 
    authMiddleware, 
    validate(categoryValidator), 
    createCategory
);
categoryRouter.delete(
    "/:id", 
    authMiddleware, 
    deleteCategory
);

module.exports = categoryRouter;