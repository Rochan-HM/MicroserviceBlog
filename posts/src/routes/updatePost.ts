import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
    validateRequest,
    NotFoundError,
    protectedRoute,
    ForbiddenError,
} from "@rmcommons/ticketapp";

import { Post } from "../models/post";
import { PostUpdatedPublisher } from "../events/publishers/postUpdatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.put(
    "/api/posts/:id",
    protectedRoute,
    [body("title").trim().not().isEmpty().withMessage("Title is required")],
    validateRequest,
    async (req: Request, res: Response) => {
        const post = await Post.findById(req.params.id);

        if (!post) {
            throw new NotFoundError();
        }

        if (post.userId !== req.currentUser!.id) {
            throw new ForbiddenError();
        }

        post.set({
            title: req.body.title,
            body: req.body.body,
        });
        await post.save();
        new PostUpdatedPublisher(natsWrapper.client).publish({
            id: post.id,
            title: post.title,
            userId: post.userId,
        });

        res.send(post);
    }
);

export { router as updatePostRouter };
