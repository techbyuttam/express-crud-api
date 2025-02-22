import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/apiResponse";
import { ERROR_CODES } from "../utils/errorCodes";
import logger from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message} | Stack: ${err.stack}`);

    res.status(500).json(
        errorResponse("Internal Server Error", ERROR_CODES.SERVER_ERROR, err.message)
    );
};
