// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ngCordova'])  // <--include ngCordova

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	//SQL lite database 
	if (window.cordova) {
      $rootScope.db = $cordovaSQLite.openDB({ name: "chats_local.db" }); //device
    }else{
      $rootScope.db = window.openDatabase("chats_local.db", '1', 'xmpp_chat', 1024 * 1024 * 100); // browser
    }
	
	$cordovaSQLite.execute($rootScope.db,"CREATE TABLE IF NOT EXISTS chats(id INTEGER primary key, to_id TEXT, from_id TEXT, message TEXT, timestamp DATE DEFAULT (datetime('now','localtime')) )");
  
  });
})