import { app } from "./app";
import mongoose from "mongoose";

const PORT = 3000;

const startServer = async () => {
    const envs = ["JWT_SIGN", "MONGO_URI"];
    for (const env of envs) {
        if (!process.env[env]) {
            throw new Error(`${env} not found.`);
        }
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database Connected");
    } catch (err) {
        console.error("Unable to Start Server", err);
    }

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

startServer();
