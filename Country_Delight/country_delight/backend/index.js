const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const UserModel = require('./models/user');
const routeruser = require('./routes/user');
const routerdisplay_data = require('./routes/display_data');
const routerOrder_data = require('./routes/OrderData')
//let url = "mongodb://127.0.0.1:27017/country_delight";
app.use(express.json());
mongoDB();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
// .then(() =>{ 
//     console.log("Connected to the MongoDB Database !");
//     const fetch_data = mongoose.connection.db.collection("food_items");
//     //console.log("Food_items ", fetch_data)
//     fetch_data.find({}).toArray(function(err,data){
//         if(err) console.log(err);
//         else {
//             global.food_items = data;
//             console.log("Food Item",data);
//         }
//     })
// })
// .catch((err) => console.log('Connection to MongoDB failed: ',err)) 

app.use('/api', routeruser);
app.use('/api', routerdisplay_data);
app.use('/api', routerOrder_data);

app.get('/', (req, res) =>{
    res.send("Hello Node")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})