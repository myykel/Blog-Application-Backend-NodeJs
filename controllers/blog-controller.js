import Blog from "../models/blog";

export const getAllBlogs = async (req, res, next)=>{
let blogs;
    try{
blogs = await Blog.find();

}catch(err){
return console.log(err)
}
if(!blogs){
    return res.status(404).json({message:"No blog found"})
}
res.status(200).json({message:{blogs}})
}

export const addBlog = async(req, res, next)=>{
    const {title,description,image, user }=req.body

    let existingUser;
    try {
        existingUser = await User.findById(user)   
    } catch (err) {
       return console.log(err) 
    }
    if(!existingUser){
     return res.status(404).json({message:"Cannot find user by that ID"})
    }
    const newBlog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
     const session = await mongoose.startSession();
     session.startTransaction();
     await newBlog.save({session})  
     existingUser.blogs.push(newBlog) 
     await existingUser.save({session})
     await session.commitTransaction();
    } catch (err) {
        return console.log(err)
    }
    res.status(200).json({newBlog})
}

export const updateBlog = async(req, res, next)=>{
const blogId = req.params.id
const {title, description}= req.body
let blog;
try {
     blog = await Blog.findByIdAndUpdate(blogId,{
       title,
       description 
    },
    {new:true})

 if(!blog){
        return res.status(404).json({message: "Blog not found, Unable to update"})
        }
 await blog.save()
} catch (err) {
    console.log(err)
}
return res.status(200).json({blog})
};

export const getById = async(req, res, next)=>{
const {id} = req.params
let blog;
 try {
blog = await Blog.findById(id)
 } catch (err) {
    return console.log(err)
 }
 if(!blog){
 return res.status(404).json({message: "Blog not found"})
 }
 return res.status(200).json({blog})
};

export const deleteBlog = async(req, res, next)=>{
    const {id} = req.params
    let blog;
    try {
     blog = await Blog.findOneAndRemove(id).populate('user');
     await blog.user.blogs.pull(blog)
     await blog.user.save()
     if(!blog){
     return res.status(500).json({message: "blog not found"})
     }
    
    await blog.save()
        
    } catch (err) {
        console.log(err)
    }
 return res.status(200).json({message:"Blog deleted successfully"})
}

export const getByUserId = async(req, res, next)=>{
const {userId} = req.params
let userBlogs; 

try {
   userBlogs = await User.findById(userId).populate("blogs")

} catch (err) {
    return console.log(err)
}
if(!userBlogs){
 return res.status(404).json({message: "No Blogs found for that Id"})
}
return res.status(200).json({userBlogs})
}