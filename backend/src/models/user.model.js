import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
       username:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        minlenght:1,
        maxlenght:30
       } ,
       password:{
        type: String,
        required:true,
        minlenght:6,
        maxlenght:50

       },

       email:{
        type:String,
         required: true,
        unique:true,
        lowercase:true,
        trim:true,
       },

    },

    {
        timestamp:true
    }
);

//before saving passwords we nee hash it

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);

    next();
});


// compare passwords 

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model("User",userSchema);