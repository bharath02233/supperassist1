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
app.post("/submit",async(req,res)=>{

    await quizMod.deleteMany({});
   await quizMod.insertMany(req.body)
  .then((data) => {
    res.json(data);
  })
  .catch(err => res.json(err));
  
    
})

app.post("/submit1",async(req,res)=>{
    await quiz1Mod.deleteMany({});
    const temp=new quiz1Mod(req.body);
    await temp.save().then((data)=>res.json(data)).catch((error)=>res.json(error))

     
   
    
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
