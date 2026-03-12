const Category = require("../schema/category.schema");
const CustomErrorHandler = require("../error/custom-error.handler");

const createCategory = async (req, res,next) => {
    try {
        const { modelName, image } = req.body;
        const existing = await Category.findOne({ modelName });
        if (req.user.role !== 'admin') {
            return next(CustomErrorHandler.Forbidden("only admin create category"));
        }
        if (existing) {
            return next(CustomErrorHandler.BadRequest(""));
        }

        const newCategory = await Category.create({
            modelName,
            image,
            addedBy: req.user.id 
        });

        res.status(201).json({
            message: "Category added",
            data: newCategory
        });
    } catch (error) {
        next(error);
    }
};

const getAllCategories = async (req, res,next) => {
    try {
        const categories = await Category.find().populate("addedBy", "username email");
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};
const getMyCategories = async (req, res, next) => {
    try {
        const myCategories = await Category.find({ addedBy: req.user.id });
        res.status(200).json(myCategories);
    } catch (error) {
        next(error);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { modelName, image } = req.body;
        if (req.user.role !== 'admin') {
            return next(CustomErrorHandler.Forbidden("Only update admin"));
        }

        const updated = await Category.findByIdAndUpdate(
            id, 
            { modelName, image }, 
            { new: true, runValidators: true }
        );

        if (!updated) {
            return next(CustomErrorHandler.NotFound("Category not found"));
        }

        res.status(200).json({ message: "Update", data: updated });
    } catch (error) {
        next(error);
    }
};
const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate("addedBy", "username");
        if (!category) {
            return next(CustomErrorHandler.NotFound("Category not found"));
        }
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};
const deleteCategory = async (req, res, next) => {
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
module.exports = {
    createCategory,
    getAllCategories,
    getMyCategories,
    updateCategory,
    getCategoryById,
    deleteCategory
}