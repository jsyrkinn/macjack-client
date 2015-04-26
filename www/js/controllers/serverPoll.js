var serverIP = "141.140.175.233";


function getClientAuth(name) {

    console.log("clientAuth not set, requesting from server...")

    var signupRequest = new XMLHttpRequest();
    signupRequest.open( "POST", 'http://' + serverIP + ':1337/signup.json?name='+name, true );

    signupRequest.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var res = JSON.parse(this.response);
        window.clientAuth = res.auth;
        window.clientID = res.playerID;
        window.localStorage.setItem('clientAuth', clientAuth);
        window.localStorage.setItem('clientID', clientID);
      }

      checkHomeScreen();
    };

    signupRequest.onerror = function() {
      console.log('Connection Failed');
    };
    signupRequest.send();
};



function setupNewGame() {
  var newgameRequest = new XMLHttpRequest();
  newgameRequest.open( "POST", 'http://' + serverIP + ':1337/games/newgame.json', true );
  newgameRequest.setRequestHeader('X-auth-code', window.clientAuth);

  newgameRequest.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var res = JSON.parse(this.response);
      window.gameID = res.gameID;
    }
  };
  newgameRequest.onerror = function() {
    console.log('Connection Failed');
  };

  newgameRequest.send();
};



function sendBet(amount) {
  var betRequest = new XMLHttpRequest();
  betRequest.open( "POST", 'http://' + serverIP + ':1337/games/'+window.gameID+'/bet.json?amount='+amount, true );
  betRequest.setRequestHeader('X-auth-code', window.clientAuth);

  betRequest.onerror = function() {
    console.log('Connection Failed - Bet not sent');
  };

  betRequest.send();
};



function sendHit() {
  var hitRequest = new XMLHttpRequest();
  hitRequest.open( "POST", 'http://' + serverIP + ':1337/games/'+window.gameID+'/hit.json', true );
  hitRequest.setRequestHeader('X-auth-code', window.clientAuth);

  hitRequest.onerror = function() {
    console.log('Connection Failed - Hit not sent');
  };

  hitRequest.send();
};


function sendStay() {
  var hitRequest = new XMLHttpRequest();
  hitRequest.open( "POST", 'http://' + serverIP + ':1337/games/'+window.gameID+'/stay.json', true );
  hitRequest.setRequestHeader('X-auth-code', window.clientAuth);

  hitRequest.onerror = function() {
    console.log('Connection Failed - Stay not sent');
  };

  hitRequest.send();
};



var gameState = {movenumber: -1};

function updateGame() {

  var updateRequest = new XMLHttpRequest();

  updateRequest.open( "GET", 'http://' + serverIP + ':1337/games/'+window.gameID+'/state.json', true );
  updateRequest.setRequestHeader('X-auth-code', window.clientAuth);

  updateRequest.onload = function() {
    //call the next poll
    poll();

    if (this.status >= 200 && this.status < 400) {
      // Success!
      var serverGameState = JSON.parse(this.response);
      //if (serverGameState.moveNumber != gameState.moveNumber) {
        gameState = serverGameState;
        window.gameState = gameState // DEBUG
        var modelGameState = new ModelGameState(gameState);
        createGameStateView(modelGameState);
        if (!window.touchHandler) {
          window.touchHandler = new TouchHandler();
        }
      //}
    }
  };

  updateRequest.onerror = function() {
    //call the next poll
    poll();

    console.log('Connection Failed');
  };

  updateRequest.send();
}

function poll() {
   setTimeout(updateGame, 1000);
};
