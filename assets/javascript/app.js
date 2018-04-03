
var config = {
  apiKey: "AIzaSyBHCj1KWI0TqfaNlffSO5hh5quqsGI4r8E",
  authDomain: "rps-online-ver.firebaseapp.com",
  databaseURL: "https://rps-online-ver.firebaseio.com",
  projectId: "rps-online-ver",
  storageBucket: "rps-online-ver.appspot.com",
  messagingSenderId: "738473785317"
};

firebase.initializeApp(config);

const name = prompt('What is your name?');
const database = firebase.database().ref('messages');
const db = firebase.database();
const playerDb = firebase.database();

// set disconnect message
db.ref('messages').once('value').then(function (data) {
  database.onDisconnect().set(name + " has disconnected~");
  const message = `${name} has disconnected`;
});

//submits the chat message ****************** Event
$('.chat-submit').on('click', function () {
  submitMessage();
})


database.on('child_added', function (message) {
  var message = message.val();
  $('.chat-area').append(`<div>${message.name}:  ${message.message}</div`);
});


$('.join').on('click', function () {
  playerDb.ref('player').once('value', function (snapshot) {
    if (!snapshot.exists() || !snapshot.val().player1) {
      playerDb.ref('player/player1').onDisconnect().remove()
      playerDb.ref("player").update({
        "player1": {
          "name": name,
          "choice": null,
          "wins": 0,
        }
      })
      $('.player1').addClass('active')
    }
    else if (snapshot.val().player1 && !snapshot.val().player2) {
      playerDb.ref('player/player2').onDisconnect().remove()
      playerDb.ref("player").update({
        "player2": {
          "name": name,
          "choice": null,
          "wins": 0,
        }
      })
      $('.player2').addClass('active')
    } else {
      alert('sorry the game is full');
    }
  })
})

/**
 * Will input a message in to the database
 * 
 * @param {*} message 
 */
function submitMessage() {
  const message = $('.chat-input').val();
  $('.chat-input').val('');
  database.push().set({
    "name": name,
    "message": message,
    "timestamp": 1459361875337
  })
}

/**************** Show Active Players   ***********/
playerDb.ref('player').on('value', function (snapshot) {
  if (snapshot.val().player1) {
    $('.player1').addClass('active')
    $('.player1-name').text(snapshot.val().player1.name)
  } else {
    $('.player1').removeClass('active')
    $('.player1-name').text('Waitting for Player1')
  }

  if (snapshot.val().player2) {
    $('.player2').addClass('active')
    $('.player2-name').text(snapshot.val().player2.name)
  } else {
    $('.player2').removeClass('active')
    $('.player2-name').text('Waitting for Player2')
  }

  if (snapshot.val().player1 && snapshot.val().player2) {
    $('.choice-list').empty();
    $('.choice-list').append('<li data-choice="rock" class="choices">rock</li> <li data-choice="papper" class="choices">papper</li><li data-choice="Sisciors" class="choices">Sisciors</li>');
    enableRPSChoice();
  }

  if ((snapshot.val().player1.choice != null) && (snapshot.val().player2.choice != null)) {

    if (snapshot.val().player1.choice === snapshot.val().player2.choice) {
      alert('TIE');
      return;
    }

    if (snapshot.val().player1.choice === "rock") {
      if (snapshot.val().player2.choice == "Sisciors") { alert(`player ${snapshot.val().player1.name} wins`) }
      if (snapshot.val().player2.choice == "papper") { alert(`player ${snapshot.val().player2.name} wins`) }
    }

    if (snapshot.val().player1.choice === "papper") {
      if (snapshot.val().player2.choice == "rock") { alert(`player ${snapshot.val().player1.name} wins`) }
      if (snapshot.val().player2.choice == "Sisciors") { alert(`player ${snapshot.val().player2.name} wins`) }
    }

    if (snapshot.val().player1.choice === "Sisciors") {
      if (snapshot.val().player2.choice == "papper") { alert(`player ${snapshot.val().player1.name} wins`) }
      if (snapshot.val().player2.choice == "rock") { alert(`player ${snapshot.val().player2.name} wins`) }
    }


  }
  console.log('fire');
})



function enableRPSChoice() {
  $('.choices').on("click", function (event) {
    const choice = $(event.target).data('choice')
    $('.choices').off()
    playerDb.ref('player').once('value', function (snapshot) {
      if (snapshot.val().player1.name === name) {
        $('.player1-choice').text(choice);
        playerDb.ref('player/player1').update({ 'choice': choice });

      }
      if (snapshot.val().player2.name === name) {
        $('.player2-choice').text(choice);
        playerDb.ref('player/player2').update({ 'choice': choice });
      }
    });

  })
}
