angular.module("wkndrCr")
	.service("Auth", ["$rootScope", "$state", "$auth", function($rootScope, $state, $auth){
		// set this for nested calls
		var self = this;

		/* 
		handle login and logout
		multiple actions can log a user in our out
		ensure all actions are handled the same way (as necessary)
		*/
		// login: user
		self._login = function(user, redirect){
			// set current user
			self.setCurrentUser(user);

			// flag required redirects
			redirect = (redirect === false ? false : true); // by default redirect to logged in splash
			if (redirect){
				// navigate to logged in splash
				$state.go("me.dashboard");
			}
		};

		// logout
		self._logout = function(redirect){
			// unset current user
			self.destroyCurrentUser();

			// flag required redirects
			redirect = (redirect === false ? false : true); // by default redirect back to login
			if (redirect){
				// kick back to splash
				$state.go("splash.root");
			}
		}

		/*
		handle current user data for app
		*/
		// initialize current user
		$rootScope.currentUser = {
			isLoggedIn: false,
			user: null
		};

		// set current user from data auth user data
		self.setCurrentUser = function(userData){
			$rootScope.currentUser.isLoggedIn = userData.signedIn;
			// $rootScope.currentUser.isAdmin = userData.admin;
			$rootScope.currentUser.user = userData;
		}

		// unset current user
		self.destroyCurrentUser = function(){
			$rootScope.currentUser.isLoggedIn = false;
			// $rootScope.currentUser.isAdmin = false;
			$rootScope.currentUser.user = null;
		}

		/*
		event handling for authentication
		(signup handled inside controller for security)
		*/
		// successful authentication
		// correct login
		$rootScope.$on("auth:login-success", function(ev, user){
			self._login(user);
		});
		// correct token
		$rootScope.$on("auth:validation-success", function(ev, user){
			self._login(user, false); // do not redirect
		})
		// error authentication
		// incorrect login
		$rootScope.$on("auth:login-error", function(ev, reason){
			self._logout(false); // do not redirect
		});
		// incorrect token
		$rootScope.$on("auth:invalid", function(ev, reason){
			self._logout();
		});
		// misc error
		$rootScope.$on("auth:validation-error", function(ev, reason){
			self._logout();
		});

		/*
		handle scoped authorization requests from controller
		controller is in charge of sending correct submission data
		controller is in charge of sending object to keep track of errors
		*/
		// authorize login
		// loginData: {}
		// successCallback: function
		// errorCallback: function
		self.logIn = function(loginData, successCallback, errorCallback){
			$auth.submitLogin(loginData)
				.then(function(response){
					if (jQuery.isFunction(successCallback)){
						successCallback(response);
					}
				})
				.catch(function(response){
					if (jQuery.isFunction(errorCallback)){
						errorCallback(response);
					}
				});
		}

		// authorize signup
		// signupData: {}
		// successCallback: function
		// errorCallback: function
		self.signUp = function(signupData, successCallback, errorCallback){
			$auth.submitRegistration(signupData)
				.then(function(response){
					if (jQuery.isFunction(successCallback)){
						successCallback(response);
					}
				})
				.catch(function(response){
					if (jQuery.isFunction(errorCallback)){
						errorCallback(response);
					}
				});
		}

		/*
		handle user logouts
		(user logouts happen through root)
		*/
		// event handling
		$rootScope.$on("auth:logout-success", function(ev){
			self._logout();
		});
		$rootScope.$on("auth:logout-error", function(ev, reason){
			self._logout();
		});
		// expired session (handle as log out)
		$rootScope.$on("auth:session-expired", function(ev){
			self._logout();
		});

		// user logout
		$rootScope.logOut = function(){
			$auth.signOut();
		}
	}]);