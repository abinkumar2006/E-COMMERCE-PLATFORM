import jwt from "jsonwebtoken";
export const signToken=u=>jwt.sign({id:u._id.toString(),role:u.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"7d"});
export const publicUser=u=>({id:u._id,name:u.name,email:u.email,role:u.role,phone:u.phone||"",address:u.address||{}});
