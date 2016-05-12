angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

   .state('tabsController.chatlogs', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/chatlogs.html',
        controller: 'chatlogsCtrl'
      }
    }
  })

  .state('tabsController.contacts', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/contacts.html',
        controller: 'contactsCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.chatDetails', {
    url: '/page6',
    views: {
      'tab2': {
        templateUrl: 'templates/chatDetails.html',
        controller: 'chatDetailsCtrl'
      }
    }
  })
  
  .state('register', {
    url: '/page7',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});