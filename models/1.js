const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const fileScheme=new Schema({
name:{
type:String,
required:true
},
text:{
type:String,
required:true
},
extension:{
type:String,
required:true
}
})
const file=mongoose.model('File',fileScheme)
module.exports=file;