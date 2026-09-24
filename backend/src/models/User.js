import mongoose from "mongoose";
const s=new mongoose.Schema({name:{type:String,required:true,trim:true,minlength:2,maxlength:80},email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},password:{type:String,required:true,select:false},role:{type:String,enum:["user","admin"],default:"user",index:true},phone:String,address:{line1:String,city:String,state:String,postalCode:String,country:String}},{timestamps:true});
export default mongoose.model("User",s);
