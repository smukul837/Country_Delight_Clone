
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/country_delight";

const mongoDB = async() => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, async(err, result) => {
        if(err) console.log("Error ", err);
        else{
            console.log("Database Connected");
            const fetch_data = mongoose.connection.db.collection("food_items");
            fetch_data.find({}).toArray(function(err, data){
                const food_Category = mongoose.connection.db.collection("foodCategory");
                food_Category.find({}).toArray(function(err, catData){
                    if(err) console.log(err);
                    else {
                        global.food_items = data;
                        global.food_Category = catData;
                        console.log("Food Item",global.food_items);
                        console.log("Food Item",global.food_Category);
                    }
                })
            })
        }
    })
}

module.exports = mongoDB;