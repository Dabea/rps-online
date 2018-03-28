
var config = {
  apiKey: "AIzaSyBHCj1KWI0TqfaNlffSO5hh5quqsGI4r8E",
  authDomain: "rps-online-ver.firebaseapp.com",
  databaseURL: "https://rps-online-ver.firebaseio.com",
  projectId: "rps-online-ver",
  storageBucket: "rps-online-ver.appspot.com",
  messagingSenderId: "738473785317"
};


firebase.initializeApp(config);

const database = firebase.database().ref();

database.set({
    "messages": {
        "1": {
                "name": "eclarke",
                "message": "The relay seems to be malfunctioning.",
                "timestamp": 1459361875337
            },
        "2": {
            "name": "Susy",
            "message": "Looks good to me.",
            "timestamp": 1459361877337
        },    
    }        
});

database.orderByValue().on("value", function(data) {
    console.log(data.val().messages[1].message);
   const messageList = data.val().messages;
   messageList.forEach(message => $('.chat-area').append(`<div>${message.name} :  ${message.message}</div`) )
 });