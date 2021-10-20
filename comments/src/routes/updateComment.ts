import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
    validateRequest,
    NotFoundError,
    protectedRoute,
    ForbiddenError,
} from "@rmcommons/blogapp";

import { Comment } from "../models/comment";
import { CommentUpdatedPublisher } from "../events/publishers/commentUpdatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.put(
    "/api/comments/:id",
    protectedRoute,
    [
        body("body")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Comment Body is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            throw new NotFoundError();
        }

        if (comment.userId !== req.currentUser!.id) {
            throw new ForbiddenError();
        }

        comment.set({
            body: req.body.body,
        });
        await comment.save();

        new CommentUpdatedPublisher(natsWrapper.client).publish({
            id: comment.id,
            userId: comment.userId,
            postId: comment.postId,
        });

        res.send(comment);
    }
);

export { router as updateCommentRouter };
