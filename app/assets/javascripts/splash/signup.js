angular.module("wkndrCr")
	.controller("wkndrSignup", [
		"$scope", "Auth", "bgChangeService", 
		function($scope, Auth, bgChangeService){
			/*
			handle singup form
			*/
			// show/hide form and success
			$scope.signupSuccess = false;

			// handle form errors
			$scope.signupErrors = { errors: false, messages: [] }

			// handle facebook signup
			$scope.facebookSignup = function(){
				Auth.facebook();
			}

			// handle signup form submission
			$scope.signupSubmit = function(){
				// build dob as yyyy/mm/dd
				$scope.signupForm.dob = $scope.signupForm.dob_year + "/" + $scope.signupForm.dob_month + "/" + $scope.signupForm.dob_day;

				// submit form for registration
				Auth.signUp($scope.signupForm, 
					function(response){ // success callback
						// handle success on signup submission
						$scope.signupErrors.errors = false;
						$scope.signupErrors.messages = [];
						// clear form and display success
						$scope.signupForm = {};
						$scope.signupSuccess = true;
					}, 
					function(response){ // error callback
						// handle errors on signup submission
						$scope.signupErrors.errors = true;
						$scope.signupErrors.messages = response.data.errors.full_messages;
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
	]);