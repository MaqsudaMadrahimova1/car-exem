require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db-config");
const errorHandler = require("./middleware/error.handler");
const authRouter = require("./router/auth.routes");
const categoryRouter = require("./router/category.routes");
const machineRouter = require("./router/machine.routes");
const app = express();

app.use(express.json());
connectDB(); 
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/machine", machineRouter);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running at:" + PORT);
    
})