const router = require('express').Router();
const { Beer, User } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require('./api');


function generateRandomNumbers(min, max, count) {
    if (max - min + 1 < count) {
      throw new Error("Range is smaller than the desired count of random numbers.");
    }
  
    const result = [];
    const numbers = new Set();
  
    while (result.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.has(randomNumber)) {
        numbers.add(randomNumber);
        result.push(randomNumber);
      }
    }
  
    return result;
}

router.get('/', async (req, res) => {
    try {
      const allBeers = await Beer.findAll();
      const numOfBeers = allBeers.length;
      const randomBeersIDs = generateRandomNumbers(1, numOfBeers, 3)
      const randomBeers = [];
      for (let i = 0; i < 1; i++) {
        const beerData = await Beer.findByPk(randomBeersIDs[i])
        randomBeers.push(beerData);
      }

      console.log(randomBeers);
      // Pass serialized data and session flag into template
      res.render('homepage', {
        randomBeers,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });


router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
   if (req.session.logged_in) {
     res.redirect('/');
     return;
   }
   res.render('signup');
 });
 
 router.get('/staff', (req, res) => {
  // If the user is already logged in, redirect the request to another route, staff
   if (req.session.logged_in) {
     res.redirect('/');
     return;
   }
   res.render('staff');
 });

 

module.exports = router;