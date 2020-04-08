//jshint esversion:6
//listID 3b534eb9f7
//APIKey 1dbd83c495814ce59f917fa061007306-us4
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname +'/signup.html')
});

app.post('/',function(req,res){
 const firstName = req.body.firstName;
 const lastName = req.body.lastName;
 const email = req.body.email;
 
 
 const data ={
     members:[{
      email_address: email,
      status:'subscribed',
      merge_fields:{
          FNAME:firstName,
          LNAME:lastName
      }
     }]
 };
 const jsonData = JSON.stringify(data);
 const url = 'https://us4.api.mailchimp.com/3.0/lists/3b534eb9f7a';
 const options = {
     method:'POST',
     auth:'Raouf_Madani:1dbd83c495814ce59f917fa061007306-us4'
 };

 const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+'/success.html');
    }else{
        res.sendFile(__dirname+'/failure.html');
        console.log(response.statusMessage);
    };

    response.on("data",function(data){
        console.log('JSON.parse(data)');
    });
 });

 request.write(jsonData);
 request.end();

});

app.post("/failure",function(req,res){
   res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log('App connected')
});
