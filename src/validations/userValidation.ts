import { body } from "express-validator";

export const userValidationRules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
];
