const sequelize = require("../config/connection");
const { Beer, User } = require("../models");

const beerData = require("./beerSeed.json");
const userData = require("./userSeed.json");

const seedFiles = async () => {
    await sequelize.sync({ force: true });
  
    const beer = await Beer.bulkCreate(beerData, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n-------beer DATA SEEDED---------\n");

    const user = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  console.log("\n------- user DATA SEEDED ------\n");

    process.exit(0);

};

seedFiles();
