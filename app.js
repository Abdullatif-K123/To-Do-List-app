const express = require('express'); 
const app = express(); 
const bodyParse  = require('body-parser'); 
const date = require(__dirname + '/date.js');
app.use(bodyParse.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static("public"));

//Home page route

const DoList = ["Wake up ","Study english","Work for web dev"];
const Work = ["Doing job"]; 
app.get('/',function(req,res){
     

   const now  = date.getDate();
    res.render('list.ejs',{DoList: DoList, now: now});
}); 

//get work route

app.get('/work',function(req,res){
      res.render('list.ejs',{DoList: Work, now: "Work List !!"})   
});
app.get('/about',function(req,res){
      res.render('about');    
});
// post Section !!!!

//Work post route

app.post('/work',function(req,res){
      Work.push(req.body.toDo); 
      res.redirect('/work');   
});
//Home post route 
app.post('/', function(req,res){
     if(req.body.list === 'Work'){
           Work.push(req.body.toDo);
           res.redirect('/work');
     }
     else{
     DoList.push(req.body.toDo);
     res.redirect("/"); 
     }
});

//localhost for now 
var port = 3000 || Process.env.PORT; 
app.listen(port,function(){
     console.log("Running!!!"); 
});