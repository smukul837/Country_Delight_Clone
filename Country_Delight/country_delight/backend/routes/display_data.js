const express = require('express');
const router = express.Router();

router.post('/food_data', (req, res) => {
    try{
        res.send([global.food_items, global.food_Category])
    } catch (error){
        res.send("Server Error")
    }
});

module.exports = router;