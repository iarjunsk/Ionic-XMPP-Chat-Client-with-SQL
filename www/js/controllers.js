angular.module('app.controllers', [])

.controller('registerCtrl', function($scope , $state , sharedConn   ) { 
	
	$scope.goToLogin=function(){
		$state.go('login', {}, {location: "replace", reload: true});
	}
	$scope.reg=function(r){
		sharedConn.register(r.jid,r.pass,r.name);
	}
	//Comment
	$scope.insert=function(r){
		$scope.register.jid="T " + $scope.register.jid ;
	}
	
	
})

.controller('settingsCtrl', function($scope,$state,sharedConn) {
	
	$scope.logout=function(){
		console.log("T");
		sharedConn.logout();
		$state.go('login', {}, {location: "replace", reload: true});
	};
})

.controller('contactsCtrl', function($scope,Chats,$state,ChatDetails) {
 
	 $scope.chats = Chats.allRoster();
	  
	  $scope.remove = function(chat) {
		Chats.removeRoster(chat);
	  };
	
	  
	  $scope.chatD=function(to_id){ 
		ChatDetails.setTo(to_id);
		$state.go('tabsController.chatDetails', {}, {location: "replace", reload: true});
	  };
	  
	  
	  $scope.add = function(add_jid){
		Chats.addNewRosterContact(add_jid);
	  };
	  
})

.controller('chatlogsCtrl', function($scope,sql,sharedConn, ChatDetails, $state) {
	var myid= sharedConn.getBareJid( sharedConn.getConnectObj().jid );
	$scope.chatlogs = sql.loadChats(myid);
	
	$scope.chatD=function(to_id){ 
		ChatDetails.setTo(to_id);
		$state.go('tabsController.chatDetails', {}, {location: "replace", reload: true});
	};
	

})

.controller('loginCtrl', function($scope , sharedConn,$state ) {

	var XMPP_DOMAIN  = 'xvamp'; // Domain we are going to be connected to.
	var xmpp_user    = 'admin';     // xmpp user name
	var xmpp_pass    = 'admin';
	
	$scope.goToRegister=function(){
		$state.go('register', {}, {location: "replace", reload: true});
	}
	
	
	
	$scope.login=function(user){
		sharedConn.login(user.jid,XMPP_DOMAIN,user.pass);
	}
	
	

	//sharedConn.login(xmpp_user,XMPP_DOMAIN,xmpp_pass);
})


.controller('chatDetailsCtrl', function($scope, $timeout, $ionicScrollDelegate,sharedConn,ChatDetails,sql) {

  $scope.hideTime = true;
  $scope.data = {};
  $scope.myId = sharedConn.getBareJid( sharedConn.getConnectObj().jid );
  $scope.to_id=ChatDetails.getTo();
  
  //Loading Previous Conversation
  $scope.messages = sql.showChats( $scope.myId , $scope.to_id );
  $ionicScrollDelegate.scrollBottom(true);

  var isIOS = ionic.Platform.isIOS(); 
  
  	$scope.sendMsg=function(to,body){
		var to_jid  = Strophe.getBareJidFromJid(to);
		var timestamp = new Date().getTime();
		var reqChannelsItems = $msg({id:timestamp, to:to_jid , type: 'chat' })
								   .c("body").t(body);
		sharedConn.getConnectObj().send(reqChannelsItems.tree());
	
	};
  
  

  $scope.showSendMessage = function() {
	  
	$scope.sendMsg($scope.to_id,$scope.data.message);  

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
	
	//Adding the message to UI
    $scope.messages.push({
      userId: $scope.myId,
      text: $scope.data.message,
      time: d
    });
	
	
	//SQL -- MSG SEND
	sql.insertChat({
		to_id: $scope.to_id,
		from_id:$scope.myId,
		message: $scope.data.message
	});	

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };
  
  
  $scope.messageRecieve=function(msg){	
  
	//  var to = msg.getAttribute('to');
	var from = msg.getAttribute('from');
	from=sharedConn.getBareJid(from);
	
	var type = msg.getAttribute('type');
	var elems = msg.getElementsByTagName('body');
  
	var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

	if (type == "chat" && elems.length > 0 ) {
		  
		var body = elems[0];
		var textMsg = Strophe.getText(body);
		
		
		//SQL -- MSG RECIEVE
		sql.insertChat({
			to_id: $scope.myId,
			from_id: from,
			message: textMsg
		});
		
		
		if( from == $scope.to_id ){
			
			$scope.messages.push({
			  userId: from,
			  text: textMsg,
			  time: d
			});
			
			$ionicScrollDelegate.scrollBottom(true);
			$scope.$apply();
			
			console.log($scope.messages);
			console.log('Message recieved from ' + from + ': ' + textMsg);
		}
		
	}
		
  }
  
  
   $scope.$on('msgRecievedBroadcast', function(event, data) {
		$scope.messageRecieve(data);
    })


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };




});


