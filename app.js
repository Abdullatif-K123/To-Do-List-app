const express = require('express'); 
const app = express(); 
const bodyParse  = require('body-parser'); 
app.use(bodyParse.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static("public"));
//Home page route

var DoList = ["Wake up ","Study english","Work for web dev"];

app.get('/',function(req,res){
     

    var options = { weekday: 'long' , month: 'short', day: 'numeric' };
    var today  = new Date();
    var now = today.toLocaleDateString('ar-EG',options); 
    res.render('list.ejs',{DoList: DoList, now: now});
}); 

//Home post route 
app.post('/', function(req,res){
     DoList.push(req.body.toDo);
     res.redirect("/"); 
});
//localhost for now
app.listen(3000,function(){
     console.log("Running!!!"); 
});