// routes/courseRoutes.js
const express = require('express');

const app = express();

// const courses = require('./courses');

const router = express.Router();

app.use(router);

// router.use((req, res) => {
//   res.send({
//     status: true,
//     data: 'hello dek',
//   });
// });

// router.use('/courses', courses);

// router.use(viewEngines);

module.exports = router;
