import express, { Request, Response } from "express";
import { protectedRoute, ForbiddenError } from "@rmcommons/ticketapp";
import { Comment } from "../models/comment";
import { CommentDeletedPublisher } from "../events/publishers/commentDeletedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.delete(
    "/api/comments/:id",
    protectedRoute,
    async (req: Request, res: Response) => {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(204).send(comment);
        }

        if (comment.userId !== req.currentUser!.id) {
            throw new ForbiddenError();
        }

        await Comment.findByIdAndDelete(req.params.id);

        new CommentDeletedPublisher(natsWrapper.client).publish({
            id: comment.id,
            userId: comment.userId,
            postId: comment.postId,
        });

        res.status(204).send(comment);
    }
);

export { router as deleteCommentRouter };
