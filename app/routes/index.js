const express = require('express');

const app = express();

const predictRoutes = require('./predictRoutes');
const reportRoutes = require('./reportRoutes');

const router = express.Router();

app.use(router);

router.get(('/'), (req, res) => {
  res.send({
    status: 'success',
    message: `View documentation API on ${ req.get('host') }/docs`,
  });
});

router.use('/predict', predictRoutes);
router.use('/reports', reportRoutes);

// router.use(viewEngines);

module.exports = router;
