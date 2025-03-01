const express = require('express');

const router = express.Router();

const predictRoutes = require('./predictRoutes');
const reportRoutes = require('./reportRoutes');

router.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: `View documentation API on ${req.get('host')}/docs`,
  });
});

router.use('/predict', predictRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
