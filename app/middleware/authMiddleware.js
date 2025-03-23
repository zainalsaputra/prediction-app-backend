 
// /* eslint-disable class-methods-use-this */
// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable consistent-return */
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const Schemas = require('../models');

// class AuthenticationsMiddleware {
//   // constructor() {}

//   async validate(req, res, next) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     next();
//   }

//   async checkUsernameDuplication(req, res, next) {
//     const { username } = req.body;
//     const existingUser = await Schemas.users.findOne({ where: { username } });

//     if (existingUser) {
//       return res.status(409).json({ message: 'Username already exists' });
//     }

//     next();
//   }

//   async hashPassword(req, res, next) {
//     const saltRounds = 10;
//     // eslint-disable-next-line no-useless-escape
//     const myPlaintextPassword = 's0/\/\P4$$w0rD';
//     // const someOtherPlaintextPassword = 'not_bacon';

//     const { password } = req.body;
//     // req.body.password = bcrypt.hashSync(password, 10); // Gunakan library bcrypt untuk hashing
//     req.body.password = bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
//       try {
//         hash.
//       } catch (error) {

//       }
//     });
//     next();
//   }

//   async createUser(req, res, next) {
//     try {
//       const { username, email, password } = req.body;
//       const user = await Schemas.users.create({ username, email, password });
//       req.user = user;
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// }

// module.exports = new AuthenticationsMiddleware();

// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
   
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) {
//     return res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
//     if (error) {
//       return res.sendStatus(403);
//     }
//     req.email = decoded.email;
//     next();
//   });
// };

// module.exports = { verifyToken };

// const jwt = require('jsonwebtoken');
// const createError = require('http-errors');

// module.exports = {
//     authenticateUser: (req, res, next) => {
//         const token = req.header('Authorization');
//         if (!token) {
//             return next(createError(401, 'Access Denied. No token provided.'));
//         }

//         try {
//             const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
//             req.user = verified;
//             next();
//         } catch (error) {
//             return next(createError(403, 'Invalid Token!'));
//         }
//     },

//     authorizeRoles: (...roles) => {
//         return (req, res, next) => {
//             if (!roles.includes(req.user.role)) {
//                 return next(createError(403, 'Forbidden: You do not have permission.'));
//             }
//             next();
//         };
//     }
// };

const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(createError(401, "Unauthorized: No token provided"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return next(createError(401, "Unauthorized: Invalid token format"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(createError(403, "Unauthorized: Invalid or expired token"));
    }
};
