'use strict';

/**
 * @ngdoc function
 * @name appNotasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appNotasApp
 */
angular.module('appNotasApp')
  .controller('MainCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // inicializando firebase
  	if ($rootScope.initialized === undefined)
  	{
  		//firebase.initializeApp(config);
  		$rootScope.auth = false;
  		$rootScope.initialized 	= true;

   		// $location.path('#!/login');
  		// FirebaseUI config
  		var uiConfig = {
  			'signInSuccessUrl': '#!/home',
  			// Terms of service url
  			'tosUrl': '<your-tos-url>',
  			'signInOptions': [
  	          // Leave the lines as is for the providers you want to offer your users
  	          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  	          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  	          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  	          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
  	          firebase.auth.EmailAuthProvider.PROVIDER_ID
  	      ],
  				'callbacks': {
  						'signInSuccess': function(currentUser, credential, redirectUrl) {

  							// getting token
  							$rootScope.authTk = credential.accessToken;
  							// getting user info
  							$rootScope.user = currentUser;
  							$rootScope.auth = true;
  							// redirecting
  							//$location.path('/home');
  							$scope.$apply();

  							$rootScope.userName = currentUser.displayName;

  							console.log($rootScope.user);

  							return true;
  						}
  					},
  	  	}

  			// Initialize the FirebaseUI Widget using Firebase.
  			var ui = new firebaseui.auth.AuthUI(firebase.auth());
  			ui.start('#firebaseui-auth-container', uiConfig);

    }


  });
