import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "@rmcommons/blogapp";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/api/comments/:postId", async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
        throw new BadRequestError("Post ID is required.");
    }

    const comments = await Comment.find({ postId });

    res.send(comments);
});

export { router as getCommentRouter };
