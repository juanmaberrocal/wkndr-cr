angular.module("wkndrCr")
	.directive("eventUsers", ["$uibModal", "UsersResource", function($uibModal, UsersResource) {
	  return {
	    restrict: "A",
	  	scope: {
	  		eventId: "=",
	  		userId: "=",
	  		users: "="
	  	},
	  	templateUrl: "me/directives/_event_users.html",
	    link: function (scope, element, attrs) {
	    	// bind invite click
	    	element.on("click", "#inviteFriend", function(ev){
	    		// open modal
					$uibModal.open({
			      ariaLabelledBy: "modal-title",
			      ariaDescribedBy: "modal-body",
			      templateUrl: "inviteModal.html",
			      controller: "inviteModalCtrl",
			      controllerAs: "$modalCtrl",
			      windowClass: "inviteModal",
			      resolve: {
			      	eventId: function(){ 
			      		return scope.eventId;
			      	},
			      	friends: function(){
			      		return UsersResource.friends({ id: scope.userId });
			      	}
			      }
			    });
	    	});
	    }
	  };
	}])
	.controller("inviteModalCtrl", function($scope, $uibModalInstance, eventId, friends){
		// instantiate controllerAs
		var $modalCtrl = this;

		// set user for modal
		$modalCtrl.friends = friends;

		// initialize error bank
		$modalCtrl.errors = {
			error: false,
			messages: []
		};

		// initialize store for friends to be invited
		$modalCtrl.inviteFriends = [];

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