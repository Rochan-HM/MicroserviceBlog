import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@rmcommons/blogapp";
import { User } from "../models/user";

const router = express.Router();

router.post(
    "/api/users/signin",
    [
        body("email").trim().isEmail().withMessage("Invalid Email"),
        body("password").trim().notEmpty().withMessage("Password Required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const userInDB = await User.findOne({ email });
        if (!userInDB) {
            throw new BadRequestError("Invalid Username or Password");
        }

        if (await bcrypt.compare(password, userInDB.password)) {
            const userJWT = jwt.sign(
                {
                    id: userInDB.id,
                    email: userInDB.email,
                },
                process.env.JWT_SIGN!
            );

            req.session = {
                jwt: userJWT,
            };

            res.status(200).send({
                user: userInDB,
                jwt: userJWT,
            });
        } else {
            throw new BadRequestError("Invalid Username or Password");
        }
    }
);

export { router as signInRouter };
