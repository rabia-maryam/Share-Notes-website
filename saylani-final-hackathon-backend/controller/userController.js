const User = require('../models/userSchema')

const registerUser =  async(req, res)=>{
    const {name , email , password } = req.body
    console.log(req.body)
    const user = new User({name , email , password })
    try{
        await user.save()
        res.status(200).json({message: "user register successfully" , user})
    }
    catch(err){
        console.log('failed to save data')
        res.status(400).json({ error: err.message });
    }
}

const loginVerification = async (req, res)=>{
    const loginData = req.body;
    console.log(loginData)
    try{
        const loginUser = await User.findOne({email : loginData.email})
        if(!loginUser){
           return res.status(404).json({message: "user not found"})
        }
        if(loginUser.password === loginData.password){
           return res.status(200).json({message: "Login success! Welcome" , user:loginUser})
        }else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    }
    catch(err){
       return res.status(500).json({message: "unable to find user" , error: err.message})
    }
}

const getAllUsers = async (req, res)=>{
    try{
        const response = await User.find();
        console.log(response)
        res.status(200).json({message: "user register successfully" , response})
    }
    catch(err){
        console.log('failed to save data')
        res.status(400).json({ error: err.message });
    }
}


module.exports = {registerUser , loginVerification , getAllUsers}