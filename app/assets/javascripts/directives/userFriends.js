angular.module("wkndrCr")
	.directive("userFriends", [
		"$uibModal", "Auth", "UsersResource", 
		function($uibModal, Auth, UsersResource) {
	  return {
	    restrict: "A",
	  	scope: {
	  		users: "=?",
	  		userId: "=?"
	  	},
	  	templateUrl: "directives/_event_users.html",
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
	    				scope.users = {owner:response}; // fixme: status (?)
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
			      templateUrl: "directives/_userFriendsModal.html",
			      controller: "userFriendsModalCtrl",
			      controllerAs: "$modalCtrl",
			      windowClass: "userFriendsModal",
			      resolve: {
			      	// friends: function(){
			      		// return scope.users;
			      	// },
			      	users: [
				      	function(){
				      		return UsersResource.query();
				      	}
				      ],
			      	friends: [
				      	function(){
				      		// build array of friend user ids
				      		var friends = [];
				      		// loop through each status key
				      		for (var status in scope.users){
				      			if (scope.users.hasOwnProperty(status)){
				      				// loop through each user in status
						      		for (var i=0; i<scope.users[status].length; i++){
						      			friends.push(scope.users[status][i].id);
						      		}
				      			}
				      		}
				      		// return array of user ids
				      		return friends;
				      	}
				      ]
			      }
			    }).result.finally(function(){
			    	// reload friends of user
		    		UsersResource.friends(
		    			{ id: scope.userId },
		    			function(response){ // success handle
		    				scope.users = {owner:response}; // fixme: status (?)
		    			},
		    			function(response){ // error handle
		    				// flag errors
		    				scope.errors.hasErrors = true;
		    				scope.errors.messages = response.data.errors;
		    			}
		    		);
			    });
	    	});
	    }
	  };
	}])
	.controller("userFriendsModalCtrl", function($scope, $uibModalInstance, UserFriendsResource, users, friends){
		// instantiate controllerAs
		var $modalCtrl = this;

		// initialize error bank
		$modalCtrl.errors = {
			error: false,
			messages: []
		};
		
		// load list of users available in system
		$modalCtrl.users = users;

		// set list of users that are already friends
		$modalCtrl.friends = friends;

		// check if user is already a friend
		$modalCtrl.checkFriendship = function(userId){
			// true -> already friends
			return ($modalCtrl.friends.indexOf(userId) > -1);
		}

		// bind add/remove friend
		$modalCtrl.addRemoveFriend = function(ev, userId){
			// get button clicked
			var button = $(ev.target);

			// check if user is friend
			if ($modalCtrl.checkFriendship(userId)){
				// if friend, remove
				UserFriendsResource.destroy(
					{ id: userId },
					function(response){ // success handle
						$modalCtrl.friends.splice($modalCtrl.friends.indexOf(userId), 1);

						// ui update
						button.removeClass("btn-danger").addClass("btn-success");
						button.text(button.text().replace("Remove", "Add"));
					},
					function(response){ // error handle
						console.error(response)
					}
				)

			}
			else {
				// if not friend, add
				UserFriendsResource.create(
					{ friend_id: userId },
					function(response){ // success handle
						$modalCtrl.friends.push(userId);

						// ui update
						button.removeClass("btn-success").addClass("btn-danger");
						button.text(button.text().replace("Add", "Remove"));
					},
					function(response){ // error handle
						console.error(response)
					}
				)
			}
		}

	  // bind close
	  $modalCtrl.close = function(){
	    $uibModalInstance.dismiss("cancel");
	  }
	});