import express, { Request, Response } from "express";
import { body } from "express-validator";
import { protectedRoute, validateRequest } from "@rmcommons/blogapp";
import { Post } from "../models/post";
import { PostCreatedPublisher } from "../events/publishers/postCreatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.post(
    "/api/posts",
    protectedRoute,
    [body("title").trim().not().isEmpty().withMessage("Title is required")],
    validateRequest,
    async (req: Request, res: Response) => {
        const post = Post.build({
            title: req.body.title,
            body: req.body.body,
            userId: req.currentUser!.id,
        });
        await post.save();

        await new PostCreatedPublisher(natsWrapper.client).publish({
            id: post.id,
            title: post.title,
            userId: post.userId,
        });

        res.status(201).send(post);
    }
);

export { router as newPostRouter };
