const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");
const methodOverride = require("method-override");

//setting to  use ejs
app.set("view engine", "ejs");
//setting to use ejs from views folder
app.set("views", path.join(__dirname, "views"));

//to use files from public folder
app.use(express.static(path.join(__dirname, "public")));

//we need to parse the data recieved from db so we should write a line here
//to parse the body content i.e, req.body
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method")); // Allows ?_method=PUT in forms

main()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
app.listen(8080, () => {
  console.log("Server is listening! 8080");
});

app.get("/", (req, res) => {
  res.send("Working:)");
});

// let chat1 = new Chat({
//   from: "Rahul",
//   to: "Rohit",
//   msg: "Hi",
//   created_at: new Date(),
// });

// chat1.save().then((res) => {
//   console.log(res);
// });

//async type because we need to wait for the data from db
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  //res.send("Working:)");
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//no need to create async function cuz we are using then catch here!
app.post("/chats", (req, res) => {
  const { from, to, msg } = req.body;
  const chat1 = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  chat1
    .save()
    .then((savedChat) => {
      console.log(savedChat);
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log(err);
    });
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});
