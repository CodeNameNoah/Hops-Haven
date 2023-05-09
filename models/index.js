const Beer = require('./Beer');
const FavBeer = require('./FavBeer');
const User = require('./User');

// User has many beers (through favBeers)
User.belongsToMany(Beer, {
    foreignKey: "user_id",
    through: FavBeer
});

// Beer has many Users (through favBeers)
Beer.hasMany(User, {
    foreignKey: "beer_id",
    through: FavBeer
});


module.exports = { Beer, FavBeer, User};