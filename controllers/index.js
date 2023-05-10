// Importing required dependencies
const router = require('express').Router();

// Importing the routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')
const dashboardRoutes = require('./dashboard-routes')

// Mounting the routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// Exporting the router
module.exports = router;