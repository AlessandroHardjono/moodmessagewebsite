(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

lastMessage = ""

var card1 = '<div class="container"><div class="row valign-wrapper"><div class="col s6 offset-s3 valign"><div class="card blue-grey darken-1"><div class="card-content white-text"><p>'
var card2 = '</p></div><div class="card-action"></div></div></div></div></div>'

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function messageloop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      xhrRequest("http://localhost:8080/messages", 'POST', reqListener);
      messageloop();
   }, 3000)
}

function reqListener(text) {
	console.log(text)
	var json = JSON.parse(text);
	var messages = json.messages;
	console.log(messages)
	var latestmessage = messages[messages.length - 1]
	if (lastMessage != latestmessage){
		lastMessage = latestmessage
		console.log("Updating card")

		$("#cardstage").fadeOut(400, () => {
			document.getElementById("cardstage").innerHTML = card1 + lastMessage + card2;
			$("#cardstage").fadeIn();
		});

		// document.getElementById("cardstage").innerHTML = card1 + lastMessage + card2

	}
}

window.onload = function () {
	$("#cardstage").fadeOut(0, () => {
			document.getElementById("cardstage").innerHTML = card1 + lastMessage + card2;
	});


	messageloop()
}
