var express = require('express');
var fs = require("fs");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/guestbook', function (req, res){
res.sendFile(__dirname + '/data.json');
});


app.get('/guestbook.html', function (req, res){
 var datas = require('./data.json');

 var results = '<table border="7" style="color:black; font-family: Times New Roman; font-name: Times, serif; font-size: 35px; background-color:green" <th></th><th></th><th></th>'

  for (var i=0; i < datas.length; i++){
  results +=
  '<tr>' +
  '<td>' +datas[i].username +'</td>'+
  '<td>' +datas[i].country +'</td>'+
  '<td>' +datas[i].message +'</td>'+
  '</tr>';
 }
res.send(results);

});

app.get('/ajaxmessage.html', function (req, res) {
  res.sendFile(__dirname + '/ajaxmessage.html');
});

app.post("/ajaxmessage", function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var country = req.body.country;
  var message = req.body.message;


  res.send(" Username: " + username + " Country: " + country + " Message " + message,);
});

app.get('/newmessage.html', function (req, res) {
  res.sendFile(__dirname + '/newmessage.html');
  
});

app.post('/newmessage', function (req, res) {
 
  var datas = require('./data.json');

  datas.push({
    "username" : req.body.username,
    "country" : req.body.country,
    "message" : req.body.message,
  });

  
var jsonStr = JSON.stringify(datas);

fs.writeFile('data.json', jsonStr, (err) =>{
  if (err) throw err;
  console.log("Saved the data!")
});

res.send("Data is completely saved")
})

app.get('*', function (req,res){
  res.send('Cant find the page', 404);
});

app.listen(8000, function () {
  console.log("Server running on port 8000");
})

