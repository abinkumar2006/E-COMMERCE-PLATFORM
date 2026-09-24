import mongoose from "mongoose";
const s=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},name:String,image:String,price:Number,quantity:Number}],subtotal:Number,shipping:Number,total:Number,status:{type:String,enum:["Pending","Processing","Shipped","Delivered"],default:"Pending",index:true},shippingAddress:{line1:String,city:String,state:String,postalCode:String,country:String}},{timestamps:true});
export default mongoose.model("Order",s);
