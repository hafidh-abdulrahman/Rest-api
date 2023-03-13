const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });
const app = express();

app.use(express.json());
connectDB();

//

//CREATE(POST),READ(GET),UPDATE(PUT),DELETE(DELETE)
//create all users
app.post("/users/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  const newUser = new User({
    fullName,
    email,
    phone,
  });
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    alert("Post request error");
  }
});
//get all users
app.use("/users/get", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    alert("Get request error");
  }
});
//get one user
app.get("/users/get/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    alert("Get request by id error");
  }
});
//delete user
app.delete("/users/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("user successfully deleted");
  } catch (error) {
    alert("Delete request error");
  }
});
//put user
app.put("/users/update/:id", async (req, res) => {
  try {
    let editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send("user updated successfully");
  } catch (error) {
    alert("Update request error");
  }
});

//PORT server
const PORT = process.env.PORT || 5005;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`Server running on port ${PORT}`)
);
