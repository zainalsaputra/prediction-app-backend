const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UsersServices = require('../services/usersServices');

class AuthControllers {
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));
        return res.status(400).json({
          status: false,
          errors: formattedErrors,
        });
      }
      const response = await UsersServices.createUser(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'User is created successfully!!',
        data: response,
        // password: bcrypt.compare(req.body.password),
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));
        return res.status(400).json({
          status: false,
          errors: formattedErrors,
        });
      }
      const response = await UsersServices.findUserByEmail(req.body);
      if (!response) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password',
        });
      }
      const { id } = response;
      const { name } = response;
      const { email } = response;
      const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s',
      });
      const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
      });
      await UsersServices.updateRefreshToken(id, refreshToken);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        age: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: response,
        accessToken,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async refreshToken(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));
        return res.status(400).json({
          status: false,
          errors: formattedErrors,
        });
      }
      const { refreshToken } = req.body;
      const user = await UsersServices.findTokenUser(refreshToken);
      if (!user || user.length === 0) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid refresh token',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Token refreshed successfully',
        // newToken,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const filters = req.query;
      const users = await UsersServices.getAllUsers(filters);
      return res.status(200).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async updateRefreshToken(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));
        return res.status(400).json({
          status: false,
          errors: formattedErrors,
        });
      }

      const { id, refreshToken } = req.body;
      const result = await UsersServices.updateRefreshToken(id, refreshToken);
      if (!result[0]) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Refresh token updated successfully',
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async deleteUsers(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        }));
        return res.status(400).json({
          status: false,
          errors: formattedErrors,
        });
      }
      const { id } = req.params;
      const response = await UsersServices.deleteUser(id);
      if (response === 0) {
        res.status(404)
          .send({
            status: false,
            message: `Course failed to deleted, ${response}`,
          });
      }
      return res.status(200)
        .send({
          status: true,
          message: 'User has been success deleted!',
        });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.sendStatus(204);
    }
    const response = await UsersServices.findTokenUser(refreshToken);
    if (!response) {
      return res.sendStatus(204);
    }
    const { id } = response[0];
    await UsersServices.updateRefreshToken(id, null);
    res.clearCookie('refreshToken');
    // return res.send(res.sendStatus(200));
    return res.status(200)
      .send({
        status: true,
        message: 'Logout Successed!!',
      });
  }
}

module.exports = AuthControllers;
