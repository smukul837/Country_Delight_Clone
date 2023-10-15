const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/order_data', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, {Order_date: req.body.order_date})
    
    let eId = await Order.findOne({'email': req.body.email})
    if(eId == null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then (() => {
                res.json({success: true})
            })
        } catch (error){
            res.send("Server Error ", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({'email': req.body.email},
            {$push: { order_data: data}}).then(() => {
                res.json({ success:true})
            })
        } catch (error) {
            res.send("Server Error ", error.message)
        }
    }
});

router.post('/myorderData', async (req, res) =>{
    try{
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData: myData })
    } catch (error) {
        res.send("Server Error ",error);
    }
})

module.exports = router;