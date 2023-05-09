const sequelize = require("../config/connection");
const { Beer } = require("../models");

const beerData = require("./beerSeed.json");

const seedFiles = async () => {
    await sequelize.sync({ force: true });
  
    const beer = await Beer.bulkCreate(beerData, {
      individualHooks: true,
      returning: true,
    });
  
    console.log("\n-------beer DATA SEEDED---------\n");

    process.exit(0);

};

seedFiles();
