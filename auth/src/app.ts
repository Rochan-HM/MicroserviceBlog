// Allow Express to handle throwing errors without next()
import "express-async-errors";
import cookieSession from "cookie-session";
import express from "express";
import cors from "cors";

import { NotFoundError, errorHandler } from "@rmcommons/blogapp";
import { currentUserRouter } from "./routes/currentuser";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

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

app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.all("*", (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
