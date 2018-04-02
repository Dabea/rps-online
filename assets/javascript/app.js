
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

// database.on("value", function(data) {
    
   
//   data.forEach(function(childSnapshot) {
//     console.log(childSnapshot)
//     var messageData = childSnapshot.val();
//     console.log(messageData);
//     $('.chat-area').append(`<div>${messageData.name}:  ${messageData.message}</div`);
    
// });
// });


 $('.chat-submit').on('click', function(){
    const message = $('.chat-input').val();
    $('.chat-input').val('');
     database.push().set({
        "name": name,
        "message": message,
        "timestamp": 1459361875337
     })
 })


 database.on('child_added', function(message) {
  var message = message.val();
  $('.chat-area').append(`<div>${message.name}:  ${message.message}</div`);
});


$('.join').on('click', function(){

  database.set({
    "player1":{
      "active": name,
      "choice": null,
      "wins": 0,
    }
  })
  $('.player1').addClass('active')
})

database.orderByChild('name').equalTo('abraham').on("value", function(snapshot) {
  console.log(snapshot.val());
  snapshot.forEach(function(data) {
console.log(data.val().remove());
  });
});


