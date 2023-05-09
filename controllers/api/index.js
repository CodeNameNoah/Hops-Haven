// Importing dependencies
const router = require('express').Router();

// Importing User, Post & Comment routes
const userRoutes = require('./user-routes.js');
const randomBeerRoutes = require('./randomBeer-routes.js');
// const favBeerRoutes = require('./favBeer-routes.js');

// Endpoints
router.use('/users', userRoutes);
router.use('/randomBeer', randomBeerRoutes);
// router.use('/favBeers', favBeerRoutes);

module.exports = router;