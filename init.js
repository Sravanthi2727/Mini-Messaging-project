const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

let allChats = 
[
  {
    from: "A",
    to: "B",
    msg: "HU",
    created_at: new Date(),
  },
  {
    from: "Aa",
    to: "Bb",
    msg: "Hii",
    created_at: new Date(),
  },
  {
    from: "arya",
    to: "Bob",
    msg: "how are you",
    created_at: new Date(),
  },
  {
    from: "Aysn",
    to: "Bas",
    msg: "Hello world",
    created_at: new Date(),
  },
  {
    from: "ajay",
    to: "can",
    msg: "Python",
    created_at: new Date(),
  },
  {
    from: "Js",
    to: "ejs",
    msg: "Frame work",
    created_at: new Date(),
  },
  {
    from: "C",
    to: "C++",
    msg: "I am updated",
    created_at: new Date(),
  },
];
Chat.insertMany(allChats);
