import express, { Request, Response } from "express";
import { NotFoundError } from "@rmcommons/blogapp";
import { Post } from "../models/post";

const router = express.Router();

router.get("/api/posts/:id", async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        throw new NotFoundError();
    }

    res.send(post);
});

export { router as getPostRouter };
