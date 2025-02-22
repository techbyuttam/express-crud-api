import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController";
import { userValidationRules } from "../validations/userValidation";
import { validateRequest } from "../middlewares/validationMiddleware";


const router: Router = Router(); // Explicitly define type

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", userValidationRules, validateRequest, createUser);
router.put("/:id", userValidationRules, validateRequest, updateUser);
router.delete("/:id", deleteUser);

export default router;
