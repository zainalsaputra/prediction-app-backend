const Users = require('../models/users');

class UsersServices {
  static async createUser(body) {
    try {
      if (!body.name) {
        throw new Error('Users name is required');
      }
      const roleFilter = body.level || 2;
      const result = await Users.create({
        name: body.name,
        email: body.email,
        password: body.password,
        roleId: roleFilter,
      });
      return result;
    } catch (error) {
      console.error('Error creating users:', error);
      throw new Error('Failed to create users');
    }
  }

  static async getAllUsers(filters = {}) {
    try {
      const options = {
        where: filters,
        order: [['name', 'ASC']],
      };
      return await Users.findAll(options);
    } catch (error) {
      console.error('Error creating users:', error);
      throw new Error('Failed to create users');
    }
  }

  static async findTokenUser(refreshToken) {
    try {
      return await Users.findAll({
        where: { refreshToken },
      });
    } catch (error) {
      console.error('Error creating users:', error);
      throw new Error('Failed to create users');
    }
  }

  static async findUserByEmail(body) {
    try {
      const options = {
        where: {
          email: body.email,
          password: body.password,
        },
      };
      return await Users.findOne(options);
    } catch (error) {
      console.error('Error creating users:', error);
      throw new Error('Failed to create users');
    }
  }

  static async updateRefreshToken(id, refreshToken) {
    try {
      return await Users.update(
        {
          refreshToken,
        },
        {
          where: { id },
        },
      );
    } catch (error) {
      console.error('Error creating users:', error);
      throw new Error('Failed to create users');
    }
  }

  static async deleteUser(id) {
    try {
      const deleted = await Users.destroy({
        where: {
          id,
        },
      });
      if (deleted === 0) {
        throw new Error('User not found or already deleted');
      }
      return deleted;
      // return { message: 'User successfully deleted', deletedCount: deleted };
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw new Error('Failed to delete user');
    }
  }

  static async checkUserExists(user_id) {
    try {
        const user = await Users.findOne({ where: { id: user_id } });
        return user !== null;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw new Error('Failed to check user existence');
    }
  }
}

module.exports = UsersServices;
