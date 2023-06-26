const router = require("express").Router();
const users = require("../models/userSchema");

// register user
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, salary, job } = req.body;

  if (!name || !email || !salary || !job) {
    return res.status(404).json("Please Fill the data");
  }
  try {
    const preUser = await users.findOne({ email: email });
   // console.log(preUser);

    if (preUser) {
      return res.status(404).json("Already present");
    } else {
      const adduser = new users({
        name: name,
        email: email,
        salary: salary,
        job: job,
      });
      await adduser.save();
      // console.log(adduser);
      return res.status(201).json(adduser);
    }
  } catch (error) {
    return res.status(404).json(error);
  }
});

// get user data
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    return res.status(200).json(userdata);
    // console.log(userdata);
  } catch (error) {}
});

// get individual user
router.get("/individual/:id", async function (req, res) {
  try {
    console.log(req.params);
    const {id}=req.params;

    const userindividual = await users.findById({_id:id});
   // console.log(userindividual);
    return res.status(201).json(userindividual);
  } catch (err) {
    return res.status(404).json(err);
  }
});

// update the user
router.patch("/updateuser/:id",async(req,res)=>{
  try {
    const {id}=req.params;

    const updateuser=await users.findByIdAndUpdate(id,req.body,{
      new:true
    })
    // console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(400).json(error);
  }
})

// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
  try {
    const {id}=req.params;

    const deleteuser=await users.findByIdAndDelete({_id:id})
    //console.log(deleteuser);
    res.status(201).json(deleteuser);

  } catch (error) {
    res.status(400).json(error);
  }
})
module.exports = router;
