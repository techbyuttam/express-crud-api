import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse";
import { ERROR_CODES } from "../utils/errorCodes";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errorResponse("Validation failed", ERROR_CODES.VALIDATION_ERROR, errors.array()));
        return;
    }
    next();
};
