import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { ERROR_CODES } from "../utils/errorCodes";
import logger from "../utils/logger";
import { Op } from "sequelize";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(successResponse("Users retrieved successfully", users));
    } catch (error) {
        logger.error(`Error in getAllUsers: ${error}`);
        res.status(500).json(errorResponse("Failed to retrieve users", ERROR_CODES.DATABASE_ERROR, error));
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json(errorResponse("User not found", ERROR_CODES.NOT_FOUND));
            return;
        }

        res.json(successResponse("User retrieved successfully", user));
    } catch (error) {
        logger.error(`Error in getUserById: ${error}`);
        res.status(500).json(errorResponse("Failed to retrieve user", ERROR_CODES.DATABASE_ERROR, error));
    }
};

// Create a user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        // Check if user already exists (duplicate email)
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            logger.warn(`Duplicate email attempt: ${email}`);
            res.status(409).json(errorResponse("Email already exists", ERROR_CODES.DUPLICATE_ENTRY));
            return;
        }

        const user = await User.create({ name, email });
        res.status(201).json(successResponse("User created successfully", user));
    } catch (error) {
        logger.error(`Error in createUser: ${error}`);
        res.status(500).json(errorResponse("Failed to create user", ERROR_CODES.DATABASE_ERROR, error));
    }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
    try {

        const { id, email } = req.body;

        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json(errorResponse("User not found", ERROR_CODES.NOT_FOUND));
            return;
        }

        // Check if user already exists (duplicate email)
        const existingUser = await User.findOne({
            where: {
                email,
                id: { [Op.ne]: req.params.id }
            }
        });
        if (existingUser) {
            logger.warn(`Duplicate email attempt: ${email}`);
            res.status(409).json(errorResponse("Email already exists", ERROR_CODES.DUPLICATE_ENTRY));
            return;
        }

        await user.update(req.body);
        res.json(successResponse("User updated successfully", user));
    } catch (error) {
        logger.error(`Error in updateUser: ${error}`);
        res.status(500).json(errorResponse("Failed to update user", ERROR_CODES.DATABASE_ERROR, error));
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json(errorResponse("User not found", ERROR_CODES.NOT_FOUND));
            return;
        }

        await user.destroy();
        res.json(successResponse("User deleted successfully"));
    } catch (error) {
        logger.error(`Error in deleteUser: ${error}`);
        res.status(500).json(errorResponse("Failed to delete user", ERROR_CODES.DATABASE_ERROR, error));
    }
};
