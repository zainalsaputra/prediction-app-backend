// routes/courseRoutes.js
const express = require('express');

const app = express();

const predictRoutes = require('./predictRoutes');
const reportRoutes = require('./reportRoutes');

const router = express.Router();

app.use(router);

// router.use((req, res) => {
//   res.send({
//     status: true,
//     data: 'hello dek',
//   });
// });

router.use('/predict', predictRoutes);
router.use('/reports', reportRoutes);

// router.use(viewEngines);

module.exports = router;
