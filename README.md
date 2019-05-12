
Stardew Tracker
===============

Stardew Tracker is a hybrid HTML/CSS/Javascript Android appication developed with PhoneGap.
The application has all of the community center items from the game Stardew Valley, and allows you to track acquisition of them. Each item also has details as to what seasons, times, and methods are required to obtain them. Progress is saved dynamically and loads when you restart the app.

App Store Link
--------------
The app is available [on the Google Play store](https://play.google.com/store/apps/details?id=com.isaactsmith.stardewtracker).

Below are previews for both phone and tablet usage.  
![alt text](https://i.imgur.com/HAq7EZx.png "Phone preview") ![alt text](https://i.imgur.com/Ov8a3Bl.png "Phone preview - dark mode")
![alt text](https://i.imgur.com/kHCCexE.jpg "Tablet preview")


Features
--------
* Contains a database of every community center bundle item, and where to get them.
* These items are sortable by season, the bundle they belong to, as well as their acquisition category.
* You can mark an item off as complete and the app will save your progress when you relaunch it.
* The rewards for each room, as well as each individual bundle are all available in the bundles view.
* Responsive design for all device sizes, and runs quickly even on slow devices.
* Dark mode available for less eye strain.

Built With
----------
* PhoneGap used to port HTML/CSS/JavaScript to a hybrid Android deployment.
* Framework7 library utilized for stylization.

Getting Started
---------------
Download: 

The app is available [on the Google Play store](https://play.google.com/store/apps/details?id=com.isaactsmith.stardewtracker).

Source code:

If you'd like to submit suggestions to the app, feel free to download the source code! 

* Run git clone https://IsaacSmith13@bitbucket.org/IsaacSmith13/stardew-tracker.git on your command line to clone the repository.
* Using Node Package Manager (NPM), run npm install in the project directory to install necessary packages.
* Follow the [PhoneGap desktop installation instructions](http://docs.phonegap.com/getting-started/1-install-phonegap/desktop/) to get your development environment set up.
* Follow the [Phonegap mobile installation instructions](http://docs.phonegap.com/getting-started/2-install-mobile-app/) to install the Phonegap app on your phone for testing purposes.
* www/index.html contains the entire application interface.
* www/js/app.js holds all the logic to create and render the database, as well as user-saved selections.
* www/img/ has all the icons for each item and reward.
* www/css/styles.css has all the custom styles. Keep in mind that the Framework7 library is utilized in index.html to make things a lot prettier.
* After making any changes, you can test the app by opening PhoneGap desktop client, then following the plus in the top left and opening the project folder.  
This will automatically host to your internal IP. Note, you may have to open port 3000 (or any port you choose) in your firewall for this to work.  
Then open the PhoneGap developer app on your mobile device and type in the IP shown on the desktop client. You can now see any changes made without having to compile to an APK!
* NOTE: For easy previewing, you can simply open the index.html file in your browser, go to developer tools, and toggle device toolbar (ctrl+shift+m in Chrome) to see what the app will look like on a mobile device.

License
-------
[MIT](./LICENSE)