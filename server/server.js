var express=require("express")
var mongoose=require("mongoose");
var quizMod=require("./models/quiz")
var quiz1Mod=require("./models/quiz1")
var bodyparser=require('body-parser'); 
var cors=require('cors');

var app=express();
mongoose.connect('mongodb+srv://bharath02233:Bharath-123@cluster0.ipbyk.mongodb.net/quiz')
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:'false'}));

app.get("/",(req,res)=>{
    res.send("hi");
})
app.post("/submit",(req,res)=>{
    console.log(req.body)
    quizMod.insertMany(req.body)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close(); // Close the connection after operation
  })
  .catch(err => console.error('Error inserting data', err));
    const response = { message: 'hi' };  // Create a response object
    res.json(response);
    
})

app.post("/submit1",(req,res)=>{
    const temp=new quiz1Mod(req.body);
    temp.save().then((res)=>{console.log(res)}).catch((error)=>{console.log(error)})

      const response = { message: 'hi' };  // Create a response object
      res.json(response);
   
    
})

app.get("/quiz",(req,res)=>{
   quizMod.find().then((data)=>{
     res.json(data);
   })
})

app.get("/quiz1",(req,res)=>{
  quiz1Mod.find().then((data)=>{
    res.json(data);
  })
})

app.listen("4300",()=>{console.log('server running sucessfully')});
