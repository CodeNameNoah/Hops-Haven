const router = require("express").Router();
const { BeerToTry } = require("../../models");

router.post("/", async (req, res) => {
    try {
        
        const tryBeerData = await BeerToTry.create({
            name: req.body.name,
            beer_id: req.body.beer_id
        })

        res.status(200).json(tryBeerData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;