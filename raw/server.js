//require express
const express = require("express")


//you have to write it -> app signifies -> your server
const app = express();

app.use(express.json())

app.get("/sayHello", function(req, res){
    res.send("Hello from Server")
})

app.get("/", function(req, res){
    res.send("HomePage")
})

// app.post("/sayHello",(req, res)=>{
//     console.log(req)
//     res.json({
//         message:"Data received successfully"
//     })
// })

// app.patch("/sayHello",function(req, res){
//     console.log(res)
//     res.send("Patch wala hello")
// })

let user;

app.get("/getSquare/:num1/:num2",(req, res)=>{
    console.log(req.params)
    let num1 = req.params.num1;
    let num2 = req.params.num2
    let multiple = num1 * num2
    res.send("Multiple is : " +multiple);
})


app.post("/sayHello",(req, res) =>{
    console.log(req.body)
    user = req.body;
    res.json({
        message:"Data recieved Successfully",
        user:user
    })  
})

//patch
app.patch("/sayHello", (req, res) =>{
    dataToUpdate = req.body;
    for(key in dataToUpdate){
        user[key] = dataToUpdate[key];
    }
    res.json({
        message:"Data update",
        user:user
    })
    res.send("Hello from patch")
})

//delete
app.delete("/sayHello", (req, res) =>{
    user = {}
    res.json({
        message:"Deleted",
        user:user
    })
})

app.get("/sayBye", function(req, res){
    res.send("Bye from server")
})

app.listen(3000,function(){
    console.log("Server started at port 3000")
})

