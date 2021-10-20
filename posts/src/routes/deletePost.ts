import express, { Request, Response } from "express";
import {
    protectedRoute,
    NotFoundError,
    ForbiddenError,
} from "@rmcommons/ticketapp";
import { Post } from "../models/post";
import { PostDeletedPublisher } from "../events/publishers/postDeletedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.delete(
    "/api/posts/:id",
    protectedRoute,
    async (req: Request, res: Response) => {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(204).send(post);
        }

        if (post.userId !== req.currentUser!.id) {
            throw new ForbiddenError();
        }

        await Post.findByIdAndDelete(req.params.id);

        new PostDeletedPublisher(natsWrapper.client).publish({
            id: post.id,
            title: post.title,
            userId: post.userId,
        });

        res.status(204).send(post);
    }
);

export { router as deletePostRouter };
