const express = require("express")

const app = express();


//case1 
 
// app.get("/simple", (req, res) => {
//     res.send("simple output");
// })

// app.get("/simple", (req, res) => {
//     res.send("simple output2");
// })

// app.get("/simple", (req, res) => {
//     res.send("simple output3");
// })


//case2 

// app.use(function(req, res) {
//     res.send("Use will always run")
// })

// app.get("/simple", (req, res) => {
//     res.send("simple output get");
// })

// app.patch("/simple", (req, res) => {
//     res.send("simple output from patch");
// })

// app.delete("/simple", (req, res) => {
//     res.send("simple output from delete");
// })

//case3

//middleware -> middleman( can be used to test anything in middle )
//user defined middleware

app.use(function(req, res, next){
    console.log("User will always run")
    next();
})

app.post("/simple", (req, res) => {
    res.send("hello from post")
})

app.listen(3000, ()=>{
    console.log("Server started at 3000")
})