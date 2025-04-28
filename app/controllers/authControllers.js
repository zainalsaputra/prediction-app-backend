// const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const UsersServices = require('../services/usersServices');

// class AuthControllers {
//   static async register(req, res) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const formattedErrors = errors.array().map((error) => ({
//           field: error.param,
//           message: error.msg,
//         }));
//         return res.status(400).json({
//           status: false,
//           errors: formattedErrors,
//         });
//       }
//       const response = await UsersServices.createUser(req.body);
//       return res.status(201).json({
//         status: 'success',
//         message: 'User is created successfully!!',
//         data: response,
//         // password: bcrypt.compare(req.body.password),
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }

//   static async login(req, res) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const formattedErrors = errors.array().map((error) => ({
//           field: error.param,
//           message: error.msg,
//         }));
//         return res.status(400).json({
//           status: false,
//           errors: formattedErrors,
//         });
//       }
//       const response = await UsersServices.findUserByEmail(req.body);
//       if (!response) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Invalid email or password',
//         });
//       }
//       const { id } = response;
//       const { name } = response;
//       const { email } = response;
//       const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '20s',
//       });
//       const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: '1d',
//       });
//       await UsersServices.updateRefreshToken(id, refreshToken);
//       res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         age: 24 * 60 * 60 * 1000,
//       });
//       return res.status(200).json({
//         status: 'success',
//         message: 'Login successful',
//         data: response,
//         accessToken,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }

//   static async refreshToken(req, res) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const formattedErrors = errors.array().map((error) => ({
//           field: error.param,
//           message: error.msg,
//         }));
//         return res.status(400).json({
//           status: false,
//           errors: formattedErrors,
//         });
//       }
//       const { refreshToken } = req.body;
//       const user = await UsersServices.findTokenUser(refreshToken);
//       if (!user || user.length === 0) {
//         return res.status(401).json({
//           status: 'error',
//           message: 'Invalid refresh token',
//         });
//       }
//       return res.status(200).json({
//         status: 'success',
//         message: 'Token refreshed successfully',
//         // newToken,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }

//   static async getAllUsers(req, res) {
//     try {
//       const filters = req.query;
//       const users = await UsersServices.getAllUsers(filters);
//       return res.status(200).json({
//         status: 'success',
//         message: 'Users retrieved successfully',
//         data: users,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }

//   static async updateRefreshToken(req, res) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const formattedErrors = errors.array().map((error) => ({
//           field: error.param,
//           message: error.msg,
//         }));
//         return res.status(400).json({
//           status: false,
//           errors: formattedErrors,
//         });
//       }

//       const { id, refreshToken } = req.body;
//       const result = await UsersServices.updateRefreshToken(id, refreshToken);
//       if (!result[0]) {
//         return res.status(404).json({
//           status: 'error',
//           message: 'User not found',
//         });
//       }

//       return res.status(200).json({
//         status: 'success',
//         message: 'Refresh token updated successfully',
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }

//   static async deleteUsers(req, res) {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const formattedErrors = errors.array().map((error) => ({
//           field: error.param,
//           message: error.msg,
//         }));
//         return res.status(400).json({
//           status: false,
//           errors: formattedErrors,
//         });
//       }
//       const { id } = req.params;
//       const response = await UsersServices.deleteUser(id);
//       if (response === 0) {
//         res.status(404)
//           .send({
//             status: false,
//             message: `Course failed to deleted, ${response}`,
//           });
//       }
//       return res.status(200)
//         .send({
//           status: true,
//           message: 'User has been success deleted!',
//         });
//     } catch (error) {
//       return res.status(400).json({
//         status: 'error',
//         message: error.message,
//       });
//     }
//   }

//   static async logout(req, res) {
//     const { refreshToken } = req.cookies;
//     if (!refreshToken) {
//       return res.sendStatus(204);
//     }
//     const response = await UsersServices.findTokenUser(refreshToken);
//     if (!response) {
//       return res.sendStatus(204);
//     }
//     const { id } = response[0];
//     await UsersServices.updateRefreshToken(id, null);
//     res.clearCookie('refreshToken');
//     // return res.send(res.sendStatus(200));
//     return res.status(200)
//       .send({
//         status: true,
//         message: 'Logout Successed!!',
//       });
//   }
// }

// module.exports = AuthControllers;


// const AuthServices = require('../services/authServices');
// const createError = require('http-errors');

// class AuthController {
//     static async register(req, res, next) {
//         try {
//             const newUser = await AuthServices.register(req.body);
//             return res.status(201).json({
//                 status: 'success',
//                 message: 'User registered successfully!',
//                 data: newUser
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     static async login(req, res, next) {
//         try {
//             const { email, password } = req.body;
//             if (!email || !password) {
//                 return next(createError(400, 'Email and password are required'));
//             }

//             const response = await AuthServices.login(email, password);
//             return res.status(200).json({
//                 status: 'success',
//                 message: 'Login successful!',
//                 response
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     static async refreshToken(req, res, next) {
//         try {
//             const { refreshToken } = req.body;
//             if (!refreshToken) return next(createError(401, 'Refresh Token required'));

//             const user = await AuthServices.refreshToken(refreshToken);
//             if (!user) return next(createError(403, 'Invalid Refresh Token'));

//             jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
//                 if (err) return next(createError(403, 'Invalid Refresh Token'));

//                 const newAccessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 res.json({ accessToken: newAccessToken });
//             });

//         } catch (error) {
//             next(error);
//         }
//     }

//     static async getAllUsers(req, res, next) {
//         try {
//             const usersData = await AuthServices.getAllUsers();

//             res.status(200).json({
//                 status: 'success',
//                 data: usersData,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

// }

// module.exports = AuthController;


const AuthServices = require('../services/authServices');
const createError = require('http-errors');
const crypto = require('crypto');
const { registerSchema, loginSchema, refreshTokenSchema } = require('../validations/authValidations');
const transporter = require('../config/nodemailer');

class AuthController {
    static async register(req, res, next) {
        try {
            const { error } = registerSchema.validate(req.body);
            if (error) return next(createError(400, error.details[0].message));

            const newUser = await AuthServices.register(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'User registered successfully!',
                data: newUser
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) return next(createError(400, error.details[0].message));

            const { email, password } = req.body;
            const response = await AuthServices.login(email, password);
            return res.status(200).json({
                status: 'success',
                message: 'Login successful!',
                response
            });
        } catch (error) {
            next(error);
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const { error } = refreshTokenSchema.validate(req.body);
            if (error) return next(createError(400, error.details[0].message));

            const { refreshToken } = req.body;
            const user = await AuthServices.refreshToken(refreshToken);
            if (!user) return next(createError(403, 'Invalid Refresh Token'));

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
                if (err) return next(createError(403, 'Invalid Refresh Token'));

                const newAccessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ accessToken: newAccessToken });
            });

        } catch (error) {
            next(error);
        }
    }


    static async getAllUsers(req, res, next) {
        try {
            const usersData = await AuthServices.getAllUsers();

            res.status(200).json({
                status: 'success',
                data: usersData,
            });
        } catch (error) {
            next(error);
        }
    }

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) return next(createError(400, 'Email is required'));

            const user = await AuthServices.findUserByEmailOnly(email);
            if (!user) return next(createError(404, 'User not found'));

            // Buat token reset password
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpire = Date.now() + 3600000; // 1 jam dari sekarang

            // Simpan token di DB
            await AuthServices.updateResetPasswordToken(user.id, resetToken, resetTokenExpire);

            // Kirim email
            const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
            const mailOptions = {
                from: `"Support Team" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: '🔒 Reset Your Password',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h2 style="color: #333;">Password Reset Request</h2>
                        <p style="color: #555;">
                            We received a request to reset your password. Click the button below to proceed:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
                                Reset Password
                            </a>
                        </div>
                        <p style="color: #999; font-size: 14px;">
                            This link will expire in 1 hour. If you did not request a password reset, please ignore this email.
                        </p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #bbb; font-size: 12px; text-align: center;">
                            &copy; ${new Date().getFullYear()} FixKan Application. All rights reserved.
                        </p>
                    </div>
                `,
            };
            
            await transporter.sendMail(mailOptions);

            res.status(200).json({
                status: 'success',
                message: 'Reset password email sent',
            });
        } catch (error) {
            next(error);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;
            if (!token || !newPassword) return next(createError(400, 'Token and new password are required'));

            const user = await AuthServices.findUserByResetToken(token);
            if (!user) return next(createError(400, 'Invalid or expired reset token'));

            if (user.resetPasswordExpires < Date.now()) {
                return next(createError(400, 'Reset token expired'));
            }

            await AuthServices.updatePassword(user.id, newPassword);

            res.status(200).json({
                status: 'success',
                message: 'Password updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = AuthController;