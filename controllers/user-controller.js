import User from '../models/user'
import bcrypt from 'bcryptjs/dist/bcrypt';

export const getAllUser = async(req, res, next)=>{
    let users;
    try{
        users = await User.find()
        
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message: "No users found"})
    }

    return res.status(200).json({users});
}

export const signup = async(req, res, next)=>{
    const {name, email, password} = req.body
    let existingUser;

    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err)

    }
    if(existingUser){
        return res.status(400).json({message:"User already exist"})
    }
    const salt = await bcrypt.genSaltSync(10)
    //const hashedPassword = await password
    const user = new User({
        name,
        email,
        //password :await bcrypt.hashSync(hashedPassword, salt),
        blogs:[]
    });
    try {
        await user.save();
    } catch (err) {
       return console.log(err)
    }{
        return res.status(201).json({user})
    }
}

export const login = async(req, res, next)=>{
    const {email, password}= req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})

    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message: "couldn't find user by this email"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(401).json({message: "Incorrect Password"})
    }
    return res.status(201).json({message: "Login successful"})
}