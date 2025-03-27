const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Roles, Users, Locations } = require('../models');
const createError = require('http-errors');

class AuthServices {
    static async register(userData) {
        const { name, email, password, roleId, province, district, subdistrict, village } = userData;

        const roleMap = {
            admin: 'af5f62b1-1d76-4534-bb81-6ce4fd82e9c1',
            user: 'bf5f62b1-1d76-4534-bb81-6ce4fd82e9c2'
        };

        const finalRoleId = roleMap[roleId] || roleMap['user'];

        const userExists = await Users.findOne({ where: { email } });
        if (userExists) throw createError(400, 'Email is already in use!');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newLocation = await Locations.create({ province, district, subdistrict, village });

        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            roleId: finalRoleId,
            locationId: newLocation.id
        });

        return newUser;
    }

    static async login(email, password) {
        const user = await Users.findOne({
            where: { email },
            include: [
                { model: Locations, as: 'location' },
                { model: Roles, as: 'role' }
            ]
        });

        if (!user) throw createError(401, 'Invalid email or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw createError(401, 'Invalid email or password');

        // console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const accessToken = jwt.sign(
            { id: user.id, role: user.role.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken, user };
    }

    static async refreshToken(refreshToken) {
        try {
            const user = await Users.findOne({
                where: { refreshToken },
                include: [{ model: Roles, as: 'role' }]
            });

            if (!user) throw createError(403, 'Invalid Refresh Token');

            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            if (!decoded) throw createError(403, 'Invalid Refresh Token');

            const newAccessToken = jwt.sign(
                { id: user.id, role: user.role.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                { id: user.id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '7d' }
            );

            user.refreshToken = newRefreshToken;
            await user.save();

            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw createError(403, 'Invalid Refresh Token');
        }
    }


    static async getAllUsers() {
        return await Users.findAll({
            include: [
                { model: Locations, as: 'location' },
            ]
        });
    }
}

module.exports = AuthServices;
