import express, { Request, Response } from "express";
import { getCurrentUser, protectedRoute } from "@rmcommons/ticketapp";

const router = express.Router();

router.get(
    "/api/users/me",
    getCurrentUser,
    protectedRoute,
    (req: Request, res: Response) => {
        res.send(req.currentUser);
    }
);

export { router as currentUserRouter };
