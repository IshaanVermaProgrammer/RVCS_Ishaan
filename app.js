const express=require("express")
const app=express()
const mongoose=require('mongoose');
const file=require('./models/1')
const fs=require('fs')
app.set('view engine','ejs');
app.set('views','templates')
const db="mongodb+srv://<username>:<password>@cluster0.ck1c2.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(8000,()=>console.log(1)))
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
file.find().then((arr)=>res.render('index',{data:arr}))
})
app.get('/add',(req,res)=>{
res.render('form')
})
app.post('/new',(req,res)=>{
let fil=req.body.link;
fs.readFile(fil,(err,data)=>{
if (err){
console.log(err);
}
else{
let str=data.toString()
const newFile=new file({
name:req.body.name,
text:str,
extension:req.body.type
})
newFile.save().then((result)=>res.redirect('/')).catch((error)=>console.log(error))
}
})
})
app.get('/files/:id',(req,res)=>{
file.findById(req.params.id).then((result)=>{
if (result.extension=='html'){
res.send(result.text)
}
else{
res.render("file",{text:result.text})
}
})
})
