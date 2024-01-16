import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const getAllUsers = (req: Request, res: Response) => {
  UserService.getAllUsersService()
    .then((users) => {
      res.status(200).json({
        message: "OK",
        result: users,
      });
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};

export const getOnlyActiveUsers = (req: Request, res: Response) => {
  UserService.getOnlyActiveUsers()
    .then((users) => {
      res.status(200).json({
        message: "OK",
        result: users,
      });
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};

export const registerNewUser = (req: Request, res: Response) => {
  UserService.registerNewUserService(req.body)
    .then((user) => {
      res.status(200).json({
        message: "OK",
        result: user,
      });
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};

export const deleteUser = (req: Request, res: Response) => {
  const { userId } = req.body;
  UserService.deleteUserService(parseInt(userId))
    .then(() => res.status(200).json({ message: "User deleted successfully" }))
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};

export const forgetPassword = (req: Request, res: Response) => {
  const { userId, newPassword } = req.body;
  UserService.forgetPasswordService(userId, newPassword)
    .then(() =>
      res.status(200).json({ message: "Password updated successfully" })
    )
    .catch((err) => {
      console.error("Error updating password:", err);
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};
