// Importing dependencies
const router = require("express").Router();
const { FavBeer } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for the logged-in user at the root endpoint '/'
router.get("/", withAuth, async (req, res) => {
  try {
    // Find all posts associated with current user
    const favBeerData = await FavBeer.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    // map the post data to plain objects
    const favBeer = favBeerData.map((post) => favBeer.get({ plain: true }));
    console.log(favBeerData)
    console.log(req.session)

    // Render "all-posts-loggedin" template and pass in the post data
    res.render("dashboard", {
    favBeer,
      logged_in: true,
    });
  } catch (err) {
    // res.redirect("login");
    res.status(500).json(err);
  }
});




// Export router
module.exports = router;