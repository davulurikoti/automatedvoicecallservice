
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCGpxTGcm_Oe1z2jLcgWSxTEVqCbtqFV8Q",
    authDomain: "register-94b35.firebaseapp.com",
    databaseURL: "https://register-94b35.firebaseio.com",
    projectId: "register-94b35",
    storageBucket: "register-94b35.appspot.com",
    messagingSenderId: "340885725915",
    appId: "1:340885725915:web:800622b4886151b1"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))
app.post("/message/:id", function(req, res) {
  let cityRef = db.collection('messages').doc(req.params.id);
  let getDoc = cityRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      res.contentType('application/xml');
      res.send("<Response><Say>"+doc.data().message+"</Say></Response>");
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
});

app.listen(PORT, function() {
	console.log(`Listening on Port ${PORT}`);
});