const router = require("express").Router();
const { FavBeer } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const favBeerData = await FavBeer.findAll();

        res.status(200).json(favBeerData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post("/", async (req, res) => {
    try {
        
        const favBeerData = await FavBeer.create({
            name: req.body.name,
            beer_id: req.body.beer_id
        })

        res.status(200).json(favBeerData);

    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;