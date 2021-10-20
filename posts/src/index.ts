import express from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import {
    errorHandler,
    NotFoundError,
    getCurrentUser,
} from "@rmcommons/ticketapp";
import { newPostRouter } from "./routes/newPost";
import { getPostRouter } from "./routes/getPost";
import { indexPostRouter } from "./routes/index";
import { updatePostRouter } from "./routes/updatePost";
import { deletePostRouter } from "./routes/deletePost";
import { natsWrapper } from "./natsWrapper";

const PORT = 3000;

const app = express();
app.set("trust proxy", true); // Trust Ingress Nginx Proxy
app.use(express.json());
app.use(cors());
app.use(
    cookieSession({
        signed: false, // since our JWT is encrypted,
        secure: false, // for dev environment
    })
);
app.use(getCurrentUser);

app.use(newPostRouter);
app.use(getPostRouter);
app.use(indexPostRouter);
app.use(updatePostRouter);
app.use(deletePostRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const startServer = async () => {
    const envs = [
        "JWT_SIGN",
        "MONGO_URI",
        "NATS_CLIENT_ID",
        "NATS_URL",
        "NATS_CLUSTER_ID",
    ];
    for (const env of envs) {
        if (!process.env[env]) {
            throw new Error(`${env} not found.`);
        }
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID!,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL!
        );

        // Graceful shutdown
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed");
            process.exit();
        });

        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to database");
    } catch (err) {
        console.error(err);
    }

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

startServer();
