import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose'
dotenv.config();

const app = express();
app.use(express.json())
//middlewares are used for handling task in the application
app.use('/api/user',router)
app.use('/api/blog',blogRouter)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3002, () => {
  //console.log(process.env.CONNECTION_STRING);
  console.log("server is running now on port 3002");
});

