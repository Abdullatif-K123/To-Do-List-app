const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
app.use(bodyParse.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Connect the database location
mongoose.connect("mongodb://localhost:27017/todolistDB");

//Create a Shcema to our database
const todoShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Didn't have anythign yet!!!"],
  },
});

//Creating a model of the schema
var Item = mongoose.model("Item", todoShema);

//Home page route

//Insert a default item to my database
const todos = new Item({
  name: "Wake up! go to class",
});
const todos1 = new Item({
  name: "Do some exercies",
});

const todos2 = new Item({
  name: "Do your homework",
});
const todo = [todos, todos1, todos2];
Item.count({}, function (err, count) {
  if (err) console.log(err);
  else { 
    if (count === 0) {
      Item.insertMany(todo, function (err) {
        if (err) console.log(err);
        else console.log("Successfuly added!!!");
      });
    }
  }
});
app.get("/", function (req, res) {
  const name = [];
  const now = date.getDate();
  Item.find(function (err, todo) {
    if (err) {
      console.log(err);
    } else {
      todo.forEach(function (elem) {
        name.push(elem.name);
      });
    }
    res.render("list.ejs", { DoList: name, now: now });
  });
});

//get work route

app.get("/work", function (req, res) {
  res.render("list.ejs", { DoList: Work, now: "Work List !!" });
});
app.get("/about", function (req, res) {
  res.render("about");
});
// post Section !!!!

//Work post route

app.post("/work", function (req, res) {
  Work.push(req.body.toDo);
  res.redirect("/work");
});
//Home post route
app.post("/", function (req, res) {
  const todo = new Item({
      name: req.body.toDo, 
  }); 
  Item.insertMany(todo, function (err) {
    if (err) console.log(err);
    else {
      if (req.body.list === "Work") {
        res.redirect("/work");
      } else {
        res.redirect("/");
      }
    }
  });
});

//localhost for now
var port = 3000 || Process.env.PORT;
app.listen(port, function () {
  console.log("Running!!!");
});
