const Blog = require('../model/Blog')

const getAllBlogs = async (req,res) => {
    const blogs = await Blog.find();
    if(!blogs) return res.status(204).json({'message' : 'No blogs found.'})
    res.json(blogs);
  }

  const createNewBlog = async (req,res)=> {
   if(!req?.body?.title || !req?.body?.content) return res.status(400).json({'message':'Blog title and content are required.'})

   try {
    const result = await Blog.create({
        title:req.body.title,
        content:req.body.content
    });
    res.status(201).json(result);
   } catch (err) {
    console.error(err);
  }
}

  const updateBlog = async (req,res)=>{
    if(!req?.body?.id)
    {
        return res.status(400).json({'message':'ID parameter is required'})
    }
    const blog = await Blog.findOne({_id : req.body.id}).exec();

    if (!blog) {
        return res.status(204).json({ "message": `No Blog matches ID ${req.body.id}.` });
    }
    if (req.body?.title) blog.title = req.body.title;
    if (req.body?.content) blog.content = req.body.content;

    const result = await blog.save();
    res.json(result);
  }
  
  const deleteBlog = async (req,res)=> {
    if(!req?.params?.id)
    {
        return res.status(400).json({'message':'ID parameter is required'})
    }

    const blog = await Blog.findOne({_id : req.params?.id}).exec();
   
    if (!blog) {
        return res.status(204).json({ "message": `No Blog matches ID ${req.params?.id}.` });
    }

    const result = await blog.deleteOne({_id : req.body.id});
    res.json(result);
 
}

const getBlogById = async (req,res)=> {
    console.log("say");
    if(!req?.params?.id)
    {
        return res.status(400).json({'message':'ID parameter is required'})
    }

    const blog = await Blog.findOne({_id : req.params.id}).exec();
   
    if (!blog) {
        return res.status(204).json({ "message": `No Blog matches ID ${req.params.id}.` });
    }
    console.log("say")
    res.json(blog);
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    updateBlog,
    deleteBlog,
    getBlogById
}