const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
app.use(bodyParse.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Connect the database location
mongoose.connect("");

//Create a Shcema to our database
const todoShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Didn't have anythign yet!!!"],
  },
  check: Boolean,
});

//Creating a model of the schema
var Item = mongoose.model("Item", todoShema);

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Item: [todoShema],
});

const List = mongoose.model("List", listSchema);
//Home page route

//Insert a default item to my database
const todos = new Item({
  name: "Wake up! go to class",
  check: false,
});
const todos1 = new Item({
  name: "Do some exercies",
  check: false,
});

const todos2 = new Item({
  name: "Do your homework",
  check: false,
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
      res.render("list.ejs", { DoList: todo, now: now });
      // todo.forEach(function (elem) {
      //   name.push(elem.name);
    }
  });
});

//get work route
app.get("/:typetodo", function (req, res) {
  const customeName = _.capitalize(req.params.typetodo);
  List.findOne({ name: customeName }, function (err, foundList) {
    if (err) console.log(err);
    else {
      if (!foundList) {
        const list = new List({
          name: req.params.typetodo,
          Item: todo,
        });
        list.save();
        res.redirect("/" + customeName);
      } else {
        res.render("list.ejs", { DoList: foundList.Item, now: foundList.name });
      }
    }
  });
});
// post Section !!!!

//Work post route

//Home post route
app.post("/", function (req, res) {
  const nametitle = req.body.list; 
  const todolist = req.body.toDo;
  const todo = new Item({
    name: todolist,
    check: false,
  }); 
  if (nametitle === date.getDate()) {
     todo.save(); 
     res.redirect("/");
  }
  else{
      List.findOne({name: nametitle}, function(err,foundlist){
         if(err)
         console.log(err); 
         else{
             foundlist.Item.push(todo);
             foundlist.save();
             res.redirect("/"  + nametitle);
         }
      })
  }
});
// deleting post

app.post("/delete", function (req, res) {
  
  const data = JSON.parse(req.body.delete); 
  const title = data.title; 
  const names = data.name; 
  
  if(title === date.getDate()){
  Item.deleteOne({ name: names }, function (err) {
    if (err) console.log(err);
    else res.redirect("/");
  });
 
  }
  else{
       List.findOneAndUpdate({name: title} , {$pull: {Item: {name: names}}}, function(err,foundlist){
             if(!err){
                res.redirect("/" + title);
             }
       });
  }
});
//localhost for now
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Running!!!");
});
