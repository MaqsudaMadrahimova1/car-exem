const { Router } = require("express");
const {createMachine,getAllMachines,getMachineById,getMachinesByCategory,updateMachine,deleteMachine } = require("../controller/machine.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const machineValidator = require("../validator/machine.validate");

const machineRouter = Router();
machineRouter.get("/", getAllMachines);
machineRouter.get("/:id", getMachineById);
machineRouter.get("/category/:categoryId", getMachinesByCategory);
machineRouter.post("/create", authMiddleware, validate(machineValidator), createMachine);
machineRouter.put("/:id", authMiddleware, validate(machineValidator), updateMachine);
machineRouter.delete("/:id", authMiddleware, deleteMachine);

module.exports = machineRouter;