import { Router } from "express";
import {
  getAllUsers,
  registerNewUser,
  deleteUser,
  forgetPassword,
  getOnlyActiveUsers,
} from "../controllers/user.controller";
import {
  userRegistrationValidationMiddleware,
  forgetPasswordValidationMiddleware,
  deleteUserValidationMiddleware,
} from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/get_all_users", getAllUsers);
userRouter.get("/get_active_users", getOnlyActiveUsers);
userRouter.post(
  "/register_user",
  userRegistrationValidationMiddleware,
  registerNewUser
);
userRouter.post("/delete_user", deleteUserValidationMiddleware, deleteUser);
userRouter.put(
  "/forget_password",
  forgetPasswordValidationMiddleware,
  forgetPassword
);

export default userRouter;
