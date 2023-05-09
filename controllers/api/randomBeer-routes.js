// Importing dependencies
const router = require("express").Router();
const { Beer } = require("../../models");

router.get("/", async (req, res) => {
    try {  

        const allBeers = await Beer.findAll();
        const numberOfBeer = allBeers.length;

        const randomBeerID = Math.floor(Math.random() * numberOfBeer);

        const randomBeerData = await Beer.findByPk(randomBeerID)

        res.status(200).json(randomBeerData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;