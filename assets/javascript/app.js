
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

const database = firebase.database().ref('messages');
const db = firebase.database();

const playerDb = firebase.database();


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



db.ref('messages').once('value').then(function(data) {
  
   
  database.onDisconnect().set(name + " has disconnected~");
  const message = `${name} has disconnected`;

    
});



 $('.chat-submit').on('click', function(){
  submitMessage();
 })


 database.on('child_added', function(message) {
  var message = message.val();
  $('.chat-area').append(`<div>${message.name}:  ${message.message}</div`);
});


$('.join').on('click', function(){

  console.log('fire')
  playerDb.ref('player').once('value', function(snapshot){
    console.log(!snapshot.exists())
    if(!snapshot.exists()) {
      playerDb.ref('player/player1').onDisconnect().remove()
      playerDb.ref("player").update({
        "player1":{
          "name": name,
          "choice": null,
          "wins": 0,
        }
      })
      $('.player1').addClass('active')
    console.log('player1 set')
    }
    else if (snapshot.val().player1 && !snapshot.val().player2) {
      playerDb.ref('player/player2').onDisconnect().remove()
      playerDb.ref("player").update({
        "player2":{
          "name": name,
          "choice": null,
          "wins": 0,
        }
      })
      $('.player2').addClass('active')
      console.log('player2 set')
    }else{
      alert('sorry the game is full');
    }
    })


   

    console.log('end')


  
})

// database.orderByChild('name').equalTo('abraham').on("value", function(snapshot) {
//   console.log(snapshot.val());
//   snapshot.forEach(function(data) {
// console.log(data.val().remove());
//   });
// });

/**
 * Will input a message in to the database
 * 
 * @param {*} message 
 */
function submitMessage(){
    const message = $('.chat-input').val();
    $('.chat-input').val('');
     database.push().set({
        "name": name,
        "message": message,
        "timestamp": 1459361875337
     })
}







/**************** Show Active Players   ***********/
playerDb.ref('player').on('value', function(snapshot){
      if(snapshot.val().player1){
        $('.player1').addClass('active')
        $('.player1-name').text(snapshot.val().player1.name)
      }else{
        $('.player1').removeClass('active')
        $('.player1-name').text('Waitting for Player1')
      }

      if(snapshot.val().player2){
        $('.player2').addClass('active')
        $('.player2-name').text(snapshot.val().player2.name)
      }else{
        $('.player2').removeClass('active')
        $('.player2-name').text('Waitting for Player2')
      }

      if(snapshot.val().player1 && snapshot.val().player2){
        
          $('.choice-list').empty();
          $('.choice-list').append('<li data-choice="rock" class="choices">rock</li> <li data-choice="papper" class="choices">papper</li><li data-choice="Sisciors" class="choices">Sisciors</li>');
          enableRPSChoice();
    

    
      
      }
})



function enableRPSChoice(){
  $('.choices').on("click", function(event){
    const choice = $(event.target).data('choice')
    console.log(choice);
    $('.choices').off()
    
})
}


