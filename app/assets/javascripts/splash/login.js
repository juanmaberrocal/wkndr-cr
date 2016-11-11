angular.module("wkndrCr")
	.controller("wkndrLogin", [
		"$scope", "Auth", "bgChangeService", 
		function($scope, Auth, bgChangeService){
			/*
			handle login form
			*/
			// handle form errors
			$scope.loginErrors = { errors: false, messages: [] }

			// handle login form submission
			$scope.loginSubmit = function(){
				// submit form for registration
				Auth.logIn($scope.loginForm, 
					null,  // no callback for success required
					function(response){ // error callback
						// handle errors on login submission
						$scope.loginErrors.errors = true;
						$scope.loginErrors.messages = response.errors;
					});
			}

			/*
			initialize background change
			through bgChange service defined in bgChangeService.js
			*/
			var bgChange; // keep track of body bg change interval
			bgChange = bgChangeService.startBgChange({ div:$("body") });

			$scope.$on("$destroy", function(){
				// stop bg change interval
				bgChangeService.stopBgChange({ interval: bgChange, div:$("body") });
			});
		}
	])