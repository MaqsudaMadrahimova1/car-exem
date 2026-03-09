const Category = require("../schema/category.schema");
const CustomErrorHandler = require("../error/custom-error.handler");

exports.createCategory = async (req, res) => {
    try {
        const { modelName, image } = req.body;
        const existing = await Category.findOne({ modelName });
        if (existing) {
            return next(CustomErrorHandler.BadRequest(""));
        }

        const newCategory = await Category.create({
            modelName,
            image,
            addedBy: req.user.id 
        });

        res.status(201).json({
            message: "Category add",
            data: newCategory
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("addedBy", "username email");
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getMyCategories = async (req, res, next) => {
    try {
        const myCategories = await Category.find({ addedBy: req.user.id });
        res.status(200).json(myCategories);
    } catch (error) {
        next(error);
    }
};
exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
            return next(CustomErrorHandler.NotFound("Category not found"));
        }

        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        next(error);
    }
};