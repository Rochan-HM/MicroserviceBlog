import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@rmcommons/ticketapp";
import { User } from "../models/user";

const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("email").trim().isEmail().withMessage("Invalid Email"),
        body("password")
            .trim()
            .isLength({ min: 8, max: 30 })
            .withMessage("Password must be between 8 - 30 characters"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (await User.findOne({ email })) {
            throw new BadRequestError("Email already exists.");
        }

        const user = User.build({ email, password });
        await user.save();

        const userJWT = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SIGN!
        );

        req.session = {
            jwt: userJWT,
        };

        res.status(201).send({
            user,
            jwt: userJWT,
        });
    }
);

export { router as signUpRouter };
