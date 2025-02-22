import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express(); // Explicitly define type

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);
app.use("/api/users", userRoutes);

sequelize.sync().then(() => {
    console.log("Database synced.");
    app.listen(5000, () => console.log("Server running on port 5000"));
});
