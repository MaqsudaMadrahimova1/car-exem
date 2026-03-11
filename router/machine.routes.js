const { Router } = require("express");
const { createMachine, getAllMachines, getMachinesByCategory, deleteMachine} = require("../controller/machine.controller");

const authMiddleware = require("../middleware/auth.middleware"); 
const validate = require("../middleware/validate.middleware"); 
const machineValidator = require("../validator/machine.validator");

const machineRouter = Router();

machineRouter.get("/", getAllMachines);
machineRouter.get("/category/:categoryId", getMachinesByCategory);
machineRouter.post("/create", authMiddleware, validate(machineValidator), createMachine);

machineRouter.delete("/:id", authMiddleware, deleteMachine);

module.exports = machineRouter;