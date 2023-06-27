const express=require("express");
require('dotenv').config();
const app=express();
const mongoose=require("mongoose");
const users=require("./models/userSchema");
const router=require("./routes/routrs")
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(router);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is started on port number ${port}`);
})