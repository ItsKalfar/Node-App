import { connection } from "../databases";
import { PoolConnection, QueryError } from "mysql2";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export const UserService = {
  getAllUsersService: (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn: PoolConnection) => {
        if (err) {
          return reject(err);
        }
        conn.query(
          "select * from users",
          (err: QueryError, resultSet: User[]) => {
            conn.release();
            if (err) {
              return reject(err);
            } else {
              return resolve(resultSet);
            }
          }
        );
      });
    });
  },
  registerNewUserService: async (newUser: User): Promise<User> => {
    return new Promise((resolve, reject) => {
      connection.getConnection(async (err, conn: PoolConnection) => {
        if (err) {
          return reject(err);
        }
        const existingUserQuery = "SELECT id FROM users WHERE email = ?";
        conn.query(existingUserQuery, [newUser.email], (err, result: any) => {
          if (!err) {
            if (result.length > 0) {
              conn.release();
              return reject("User with this email already exists.");
            }
          }
        });

        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const sql =
          "INSERT INTO users (name, mobile, email, password, status) VALUES (?, ?, ?, ?, ?)";
        const values = [
          newUser.name,
          newUser.mobile,
          newUser.email,
          hashedPassword,
          newUser.status,
        ];

        conn.query(sql, values, (err: QueryError | null) => {
          conn.release();
          if (err) {
            return reject(err);
          } else {
            return resolve(newUser);
          }
        });
      });
    });
  },
  deleteUserService: (userId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn: PoolConnection) => {
        if (err) {
          return reject(err);
        }
        console.log(userId);
        const sql = "UPDATE users SET status = 0 WHERE id = ?";
        const values = [userId];
        conn.query(sql, values, (err: QueryError | null, result: any) => {
          conn.release();
          if (err) {
            return reject(err);
          }
          const userDeleted = result.affectedRows > 0;
          resolve(userDeleted);
        });
      });
    });
  },
  forgetPasswordService: (
    userId: number,
    newPassword: string
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      connection.getConnection(async (err, conn: PoolConnection) => {
        if (err) {
          return reject(err);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateSql = "UPDATE users SET password = ? WHERE id = ?";
        const updateValues = [hashedPassword, userId];

        conn.query(updateSql, updateValues, (err, result: any) => {
          conn.release();

          if (err) {
            return reject(err);
          }
          if (result.affectedRows === 0) {
            return resolve(false);
          }
          resolve(true);
        });
      });
    });
  },
  getOnlyActiveUsers: (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, conn: PoolConnection) => {
        if (err) {
          return reject(err);
        }
        conn.query(
          "select * from users where status=1",
          (err: QueryError, resultSet: User[]) => {
            conn.release();
            if (err) {
              return reject(err);
            } else {
              return resolve(resultSet);
            }
          }
        );
      });
    });
  },
};
