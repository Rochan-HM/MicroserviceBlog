import express, { Request, Response } from "express";
import { body } from "express-validator";
import { protectedRoute, validateRequest } from "@rmcommons/blogapp";
import { Comment } from "../models/comment";
import { CommentCreatedPublisher } from "../events/publishers/commentCreatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.post(
    "/api/comments",
    protectedRoute,
    [
        body("body")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Comment Body is required"),
        body("postId")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Post ID is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const comment = Comment.build({
            body: req.body.body,
            postId: req.body.postId,
            userId: req.currentUser!.id,
        });
        await comment.save();

        await new CommentCreatedPublisher(natsWrapper.client).publish({
            id: comment.id,
            userId: comment.userId,
            postId: comment.postId,
        });

        res.status(201).send(comment);
    }
);

export { router as newCommentRouter };
