# macjack-client

***Introduction***

Welcome! MacJack is a Macalester College-themed blackjack game. This app provides a way for people to play a game of blackjack together without having an actual deck of cards. There is a virtual dealer for users to play against and has room for up to 3 players. 

***Requirements and Installation***

This app requires cordova phonegap, node, and the phonegap app in order to run.

1. Phonegap desktop and mobile apps
  - Follow the instructions for installation here: (http://phonegap.com/install/, http://app.phonegap.com/)
2. Node 
  - Follow the instructions for installation here: (https://nodejs.org/download/) 

***Configuration***

In order to run the app, follow these instructions:

1. The client repositories can be found at https://github.com/jsyrkinn/macjack-client. Check out and pull this code.
   Be sure you have downloaded the phonegap mobile app and install phonegap onto your desktop (links and directions above).

2. Open macjack-client/www/js/controllers/serverPoll.js. Change the first line of the code to reflect your current IP address.     For instance, if your IP address is “141.140.159.23:3000”, then the first line should read 
      var serverIP = "141.140.159.23";

3. Open a terminal window and navigate to the macjack-client folder. Run the client by typing ‘phonegap serve’

4. Open another terminal window and navigate to the macjack-server folder. Run the server by typing ‘node server.js’ (Be sure to    follow the server README instructions as well).

5. Open your phonegap mobile app and enter in your IP address. Press connect.
    Note: A 3-finger tap takes you back to the home screen of the phonegap app (This allows you to reconnect with a new IP          address- or connect again with the same one!)

6. The app will now be running. Enjoy!


