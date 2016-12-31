var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var deasync = require('deasync');

// Create application/x-www-form-urlencoded parser
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var session = require('express-session');
app.use(session({secret: 'SecurityKeyIDontKnowWhatIsHappening',resave: true,saveUninitialized : false}));
app.use(bodyParser.json()); // for parsing application/json
var fs = require("fs");
var re1 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var re2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
      
app.use(express.static('serverdata'));
////home page 
app.get('/', function (req, res) {
    ////user has open website
    //console.log("user has open web site");
    /// user's ip
    //console.log("this session is for :"+req.headers['x-forwarded-for']);
    /// user know see home page
    res.sendFile( __dirname + "/" + "home.html" );
});
////////////////////////////////////////////////////////////////////////
////sign up request
app.post('/signup', urlencodedParser, function (req, res) {
    ////intiating user data 
    obj = {
            name:req.body.nameinfo2,
            email:req.body.emailinfo2,
            pass:req.body.pasinfo2,
            tables:{tall:[],tcomp:[],tarchi:[],tprog:[]}
    };
    /////user try to log in 
    //console.log("newuser : " + obj.email + "is trying to sign up");
    /////vars 
    var flag = true ;
    var email = obj.email ;
    var password = obj.pass ;
    var flagemail = re1.test(email) ;
    var flagpass = re2.test(password);
    var curUsers = fs.readFileSync(__dirname + "/" +"serverdata" + "/" + "package.json", 'utf8');
    //////checking user's email and password
    curUsers = JSON.parse(curUsers);
    obj = JSON.parse(JSON.stringify(obj));
    for(var i=0 ; i<curUsers.length ; i++){
      if(curUsers[i].email==obj.email && curUsers[i].pass==obj.pass){
        flag=false;
      }
    }
    var shiter = /\s+/g;
    var gohome = !shiter.test(obj.name);
    //console.log(gohome);
    if(flagemail && flagpass && flag && gohome && obj.name.length != 0){
      //setting user jason file data 
      //console.log("ENTER");
      curUsers.push(obj);
      fs.writeFileSync(__dirname + "/" +"serverdata" + "/" + "package.json", JSON.stringify(curUsers) , 'utf8');
      ///setting session
      req.session.name = obj.names;
      req.session.email = obj.email;
      req.session.pass = obj.pass;
      /// user now see div page 
      res.sendFile( __dirname + "/" + "DIV.html" );    
    }
    else{
      flag=true;
      /// user know see home page
      res.sendFile(__dirname + "/" + "home.html");
    }  
});

////// log in request 
app.post('/login', urlencodedParser, function (req, res) {
    //console.log("ENTERENTERENTERENTERENTERENTERENTERENTERENTER");
    /// catching user's data
    obj = {
            email:req.body.emailinfo1,
            pass:req.body.pasinfo1,
    };
    /// user try to log in 
    //console.log("user : "+ obj.email +"tries to log in ");
    ///vars
    var username ; 
    var flag = false ;
    var email = obj.email ;
    var password = obj.pass ;
    var flagemail = re1.test(email) ;
    var flagpass = re2.test(password);
    var curUsers = fs.readFileSync(__dirname + "/" +"serverdata" + "/" + "package.json", 'utf8');

    /// getting data
    curUsers = JSON.parse(curUsers);
    obj = JSON.parse(JSON.stringify(obj));
    for(var i=0 ; i<curUsers.length ; i++){
      //console.log(curUsers[i].email+"--->"+obj.email+" "+curUsers[i].pass+"--->"+obj.pass+'\n');
      if(curUsers[i].email==obj.email && curUsers[i].pass==obj.pass){
        flag=true;
        username = curUsers[i].name ;
        i=curUsers.length;
      }
    }
    if(flagemail && flagpass && flag){
      //// user now is physically logged in
      req.session.name = username ;
      req.session.email = obj.email ;
      req.session.pass = obj.pass ; 
      res.sendFile(__dirname + "/" + "DIV.html");    
    }
    else{
      res.sendFile(__dirname + "/" + "home.html");
      flag=false;
    }
});

/// user has left
app.post('/signout' , urlencodedParser ,  function (req,res) {
    /// finishing session and redirecting user
    //console.log("user : " + req.session.email + " is signing out and his session is destroyed ");
    req.session.destroy();
    res.sendFile(__dirname + "/" + "home.html");
});

///  
app.post('/save',urlencodedParser , function (req, res) {
  ////// data sent is object of the four tables  
  //  console.log(JSON.stringify(req.body));
    ////////////////////////////////////////////////
    var objector =  {  tall:[],
                      tcomp:[],
                      tarchi:[],
                      tprog:[]};
      if (req.body.tall != null)
          objector.tall = req.body.tall;
      if (req.body.tcomp != null)
          objector.tcomp = req.body.tcomp;
      if (req.body.tarchi != null)
          objector.tarchi = req.body.tarchi;
      if (req.body.tprog != null)
          objector.tprog = req.body.tprog;
      //  console.log(JSON.stringify(objector));
    ////////////////////////////////
    data = {
      tables:objector
    };
    //user try to save his data
    //console.log("user : " + req.session.email + "try to save his data");
    //fetching user tables to modifiy it 
    var curUsers = fs.readFileSync(__dirname + "/" +"serverdata" + "/" + "package.json", 'utf8');
    curUsers = JSON.parse(curUsers);
    obj = JSON.parse(JSON.stringify(obj));
    for(var i=0 ; i<curUsers.length ; i++){
      if(curUsers[i].email==req.session.email && curUsers[i].pass==req.session.pass){
        //modifing user's data
        curUsers[i].tables = JSON.parse(JSON.stringify(data.tables));
        i=curUsers.length;
      }
    }
    fs.writeFileSync(__dirname + "/" +"serverdata" + "/" + "package.json", JSON.stringify(curUsers) , 'utf8');
    //console.log("user : " + req.session.email + "modified his table data")
    res.end();
});

///// java script acquire data
app.get('/acquiredata', function(req, res) { 
    //console.log("java script acquire data for user :" + req.session.email);
    /// fetching data of user from json
    var neededdata ;
    var curUsers = fs.readFileSync(__dirname + "/" +"serverdata" + "/" + "package.json", 'utf8');
    curUsers = JSON.parse(curUsers);
    obj = JSON.parse(JSON.stringify(obj));
    for(var i=0 ; i<curUsers.length ; i++){
      if(curUsers[i].email==req.session.email && curUsers[i].pass==req.session.pass){
        //getting user email&pass&tables
        neededdata = curUsers[i] ;
        i=curUsers.length;
      }
    }
    //console.log("acquired data is :  " + JSON.stringify(neededdata));
    /////sending data to java script 
    //console.log( "node.js is sending data to javascript for user : " + req.session.email);
        res.send(neededdata);             
});
   
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port) 
})