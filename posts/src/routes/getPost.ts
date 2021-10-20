import express, { Request, Response } from "express";
import { NotFoundError } from "@rmcommons/ticketapp";
import { Post } from "../models/post";

const router = express.Router();

router.get("/api/posts/:id", async (req: Request, res: Response) => {
    const ticket = await Post.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket);
});

export { router as getPostRouter };
