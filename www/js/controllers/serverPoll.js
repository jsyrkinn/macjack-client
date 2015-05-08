var serverIP = "nodejs-jammf.rhcloud.com:80";

function getClientAuth(name) {
    console.log("clientAuth not set, requesting from server...")
    var signupRequest = new XMLHttpRequest();
    signupRequest.open( "POST", 'http://' + serverIP + '/signup.json?name='+name, true );

    signupRequest.onload = function() {
      stopSpinner();
      if (this.status >= 200 && this.status < 400) { //Successful response from server
        var res = JSON.parse(this.response);
        window.clientAuth = res.auth;
        window.clientID = res.playerID;
        window.localStorage.setItem('clientAuth', clientAuth);
        window.localStorage.setItem('clientID', clientID);
      }
      checkHomeScreen();
    };

    signupRequest.onerror = function() {
      stopSpinner();
      console.log('Connection Failed');
    };

    signupRequest.send();
    startSpinner();
};

function setupNewGame() {
  var newgameRequest = new XMLHttpRequest();
  newgameRequest.open( "POST", 'http://' + serverIP + '/games/newgame.json', true );
  newgameRequest.setRequestHeader('X-auth-code', window.clientAuth);
  newgameRequest.setRequestHeader('Cache-Control', "no-cache");

  newgameRequest.onload = function() {
    stopSpinner();
    if (this.status >= 200 && this.status < 400) {
      var res = JSON.parse(this.response);
      window.gameID = res.gameID;
      window.localStorage.setItem('gameID', window.gameID);
      makeGameIdScreen();
    } else {
      console.log("Setup New Game - Error");
    }
  };

  newgameRequest.onerror = function() {
    stopSpinner();
    console.log('Connection Failed');
  };

  newgameRequest.send();
  startSpinner();
};

function sendJoinGame(gameID) {
  var joinGameRequest = new XMLHttpRequest();
  joinGameRequest.open( "POST", 'http://' + serverIP + '/games/'+gameID+'/join.json', true );
  joinGameRequest.setRequestHeader('X-auth-code', window.clientAuth);
  joinGameRequest.setRequestHeader('Cache-Control', "no-cache");

  joinGameRequest.onload = function() {
    stopSpinner();
    if (this.status >= 200 && this.status < 400) {
      window.gameID = gameID;
      window.localStorage.setItem('gameID', window.gameID);
      updateGame();
    } else {
      console.log("Join Game - Error");
    }
  };

  joinGameRequest.onerror = function() {
    stopSpinner();
    console.log('Connection Failed');
  };
  joinGameRequest.send();
  startSpinner();
};

function sendBet(amount) {
  window.betGoing = true;
  var betRequest = new XMLHttpRequest();
  betRequest.open( "POST", 'http://' + serverIP + '/games/'+window.gameID+'/bet.json?amount='+amount, true );
  betRequest.setRequestHeader('X-auth-code', window.clientAuth);
  betRequest.setRequestHeader('Cache-Control', "no-cache");

  betRequest.onload = function() {
    stopSpinner();
    if (this.status >= 200 && this.status < 400) {
    } else {
      window.betGoing = false;
      console.log("Bet - Error");
    }
  };

  betRequest.onerror = function() {
    console.log('Connection Failed - Bet not sent');
  };

  betRequest.send();
};

function sendHit() {
  var hitRequest = new XMLHttpRequest();
  hitRequest.open( "POST", 'http://' + serverIP + '/games/'+window.gameID+'/hit.json', true );
  hitRequest.setRequestHeader('X-auth-code', window.clientAuth);
  hitRequest.setRequestHeader('Cache-Control', "no-cache");

  hitRequest.onerror = function() {
    console.log('Connection Failed - Hit not sent');
  };

  hitRequest.send();
};

function sendStay() {
  var hitRequest = new XMLHttpRequest();
  hitRequest.open( "POST", 'http://' + serverIP + '/games/'+window.gameID+'/stay.json', true );
  hitRequest.setRequestHeader('X-auth-code', window.clientAuth);
  hitRequest.setRequestHeader('Cache-Control', "no-cache");

  hitRequest.onerror = function() {
    console.log('Connection Failed - Stay not sent');
  };
  hitRequest.send();
};

function sendContinue() {
  var continueRequest = new XMLHttpRequest();
  continueRequest.open( "POST", 'http://' + serverIP + '/games/'+window.gameID+'/continue.json', true );
  continueRequest.setRequestHeader('X-auth-code', window.clientAuth);
  continueRequest.setRequestHeader('Cache-Control', "no-cache");

  continueRequest.onerror = function() {
    console.log('Connection Failed - Continue not sent');
  };
  continueRequest.send();
};

var gameState = {movenumber: -1};

function updateGame() {
  var updateRequest = new XMLHttpRequest();
  updateRequest.open("GET", 'http://' + serverIP + '/games/'+window.gameID+'/state.json', true );
  updateRequest.setRequestHeader('X-auth-code', window.clientAuth);
  updateRequest.setRequestHeader('Cache-Control', "no-cache");

  updateRequest.onload = function() {
    poll();
    if (this.status >= 200 && this.status < 400) {
      var serverGameState = JSON.parse(this.response);
        gameState = serverGameState;
        window.gameState = gameState;
        var modelGameState = new ModelGameState(gameState);
        createGameStateView(modelGameState);
    } else if (this.status == 406) {
      // client up to date, no changes necessary
    } else {
      // auth error, clear game ID and return to main screen
      leaveGame();
    }
  };

  updateRequest.onerror = function() {
    poll();
    console.log('Connection Failed');
  };
  updateRequest.send();
}

function poll() {
  console.log("poll");
  window.pollTimeout = setTimeout(updateGame, 200);
};
