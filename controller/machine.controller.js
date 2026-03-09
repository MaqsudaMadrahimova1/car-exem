const Machine = require("../schema/machine.schema");
const Category = require("../schema/category.schema");
const CustomErrorHandler = require("../error/custom-error.handler");

const createMachine = async (req, res) => {
    try {
        const { name, brand, price, image, categoryId } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            return next(CustomErrorHandler.NotFound("Category not found"));
        }

        const newMachine = await Machine.create({
            name,
            brand,
            price,
            image,
            categoryId,
            addedBy: req.user.id 
        });

        res.status(201).json({
            message: "aded machine",
            data: newMachine
        });
    } catch (error) {
        next(error);
    }
};
const getAllMachines = async (req, res, next) => {
    try {
        const machines = await Machine.find()
            .populate("categoryId", "modelName") 
            .populate("addedBy", "username");  

        res.status(200).json(machines);
    } catch (error) {
        next(error);
    }
};
const getMachinesByCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const machines = await Machine.find({ categoryId });
        
        res.status(200).json(machines);
    } catch (error) {
        next(error);
    }
};

const deleteMachine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Machine.findByIdAndDelete(id);

        if (!deleted) {
            return next(CustomErrorHandler.NotFound("Machine not found"));
        }

        res.status(200).json({ message: "Machine deleted" });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createMachine,
    getAllMachines,
    getMachinesByCategory,
    deleteMachine,
}