require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.send("Hi I am Live");
});

// using middleware
app.use("/api/products", products_routes);   
const start = async ()=> {
    try {
        await connectDB(process.env.MONGODB_URL);   
        app.listen(port, () => {
           console.log(`the port => ${port} is connected`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();