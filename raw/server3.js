const express = require("express")
const app = express();
app.use(express.json());

app.post("/simple",(req, res, next) => {
    let data = req.body;

    //Object.keys(data) = ["name",'age'];
    let length = Object.keys(data).length

    if(length == 0){
        res.send("Kindly Enter data")
    }else
    next();
})


app.post("/simple",(req, res) => {
    console.log(req.body);
    res.send("Hello from post2");
})




app.listen(3000,function(){
    console.log("Server started at 3000")
})