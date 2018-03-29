
var config = {
  apiKey: "AIzaSyBHCj1KWI0TqfaNlffSO5hh5quqsGI4r8E",
  authDomain: "rps-online-ver.firebaseapp.com",
  databaseURL: "https://rps-online-ver.firebaseio.com",
  projectId: "rps-online-ver",
  storageBucket: "rps-online-ver.appspot.com",
  messagingSenderId: "738473785317"
};

const name = prompt('What is your name?');

firebase.initializeApp(config);

const database = firebase.database().ref().child('messages');


// database.set({
//     "messages": {
//         "1": {
//                 "name": "eclarke",
//                 "message": "The relay seems to be malfunctioning.",
//                 "timestamp": 1459361875337
//             },
//         "2": {
//             "name": "Susy",
//             "message": "Looks good to me.",
//             "timestamp": 1459361877337
//         },    
//     }        
// });

database.on("value", function(data) {
    console.log(data.val());
   data.map(message => $('.chat-area').text(`<div>test fdaslfdajkl</div`) )
  
 });


 $('.chat-submit').on('click', function(){
     alert('message');
     database.push().set({
        "name": name,
        "message": "test Message ",
        "timestamp": 1459361875337
     })
 })