var serverIP = "141.140.157.1";


function getClientAuth() {
  window.clientAuth = window.localStorage.getItem('clientAuth');
  window.clientID = window.localStorage.getItem('clientID');

  //if (!clientAuth) {
    console.log("clientAuth not set, requesting from server...")

    var signupRequest = new XMLHttpRequest();
    signupRequest.open( "POST", 'http://' + serverIP + ':1337/signup.json?name=binny', true );

    signupRequest.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var res = JSON.parse(this.response);
        window.clientAuth = res.auth;
        window.clientID = res.playerID;
        window.localStorage.setItem('clientAuth', clientAuth);
        window.localStorage.setItem('clientID', clientID);
      }
    };

    signupRequest.onerror = function() {
      console.log('Connection Failed');
    };
    signupRequest.send();
  //}
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


function testBet() {

  var betRequest = new XMLHttpRequest();
  betRequest.open( "POST", 'http://' + serverIP + ':1337/games/'+window.gameID+'/bet.json?amount=1500', true );
  betRequest.setRequestHeader('X-auth-code', window.clientAuth);

  betRequest.onerror = function() {
    console.log('Connection Failed');
  };

  betRequest.send();
};

function testHit() {

  var hitRequest = new XMLHttpRequest();
  hitRequest.open( "POST", 'http://' + serverIP + ':1337/games/'+window.gameID+'/hit.json', true );
  hitRequest.setRequestHeader('X-auth-code', window.clientAuth);

  hitRequest.onerror = function() {
    console.log('Connection Failed');
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