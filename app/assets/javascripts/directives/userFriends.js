angular.module("wkndrCr")
	.directive("userFriends", ["$uibModal", "Auth", "UsersResource", function($uibModal, Auth, UsersResource) {
	  return {
	    restrict: "A",
	  	scope: {
	  		users: "=?",
	  		userId: "=?"
	  	},
	  	templateUrl: "me/directives/_event_users.html",
	    link: function(scope, element, attrs){
	    	// initialize error map
	    	scope.errors = {
	    		hasErrors: false,
	    		messages: []
	    	};

	    	// check if array of users already defined
	    	if (typeof scope.users == "undefined"){
	    		// use given user id or current user
	    		if (typeof scope.userId == "undefined"){
	    			scope.userId = Auth.getCurrentUser().user.id;
	    		}

	    		// load friends of user
	    		UsersResource.friends(
	    			{ id: scope.userId },
	    			function(response){ // success handle
	    				scope.users = response;
	    			},
	    			function(response){ // error handle
	    				// flag errors
	    				scope.errors.hasErrors = true;
	    				scope.errors.messages = response.data.errors;
	    			}
	    		);
	    	}

	    	// bind invite click
	    	element.on("click", "#inviteFriend", function(ev){
	    		// open modal
					$uibModal.open({
			      ariaLabelledBy: "modal-title",
			      ariaDescribedBy: "modal-body",
			      templateUrl: "me/directives/_userFriendsModal.html",
			      controller: "userFriendsModalCtrl",
			      controllerAs: "$modalCtrl",
			      windowClass: "userFriendsModal",
			      resolve: {
			      	friends: function(){
			      		return scope.users;
			      	}
			      }
			    });
	    	});
	    }
	  };
	}])
	.controller("userFriendsModalCtrl", function($scope, $uibModalInstance, UsersResource, friends){
		// instantiate controllerAs
		var $modalCtrl = this;

		// initialize error bank
		$modalCtrl.errors = {
			error: false,
			messages: []
		};

		// initialize store for friends to be invited
		$modalCtrl.inviteFriends = [];
		
		// load list of users available in system
		$modalCtrl.users = UsersResource.query();

		// set list of users that are already friends
		$modalCtrl.friends = friends;

		// bind upload on ok
		$modalCtrl.ok = function(){
			// upload({
			// 	url: "/auth",
			// 	method: "PUT",
			// 	data: {
			// 		avatar: $modalCtrl.avatar.imgFile
			// 	}
			// }).then(
			// 	function(response){ // success response
			// 		// clear errors
			// 		$modalCtrl.errors.error = false;
			// 		$modalCtrl.errors.messages = [];
					
			// 		// set new avatars
			// 		// response.data.data => user data
			// 		currUser.user.avatar = response.data.data.avatar;

			// 		// close modal
		 //    	$uibModalInstance.close();				
			// 	},
			// 	function(response){ // error response
			// 		// display errors
			// 		$modalCtrl.errors.error = true;
			// 		$modalCtrl.errors.messages = response.data.errors;
			// 	}
			// );
	  }

	  // bind close
	  $modalCtrl.cancel = function(){
	    $uibModalInstance.dismiss("cancel");
	  }
	});