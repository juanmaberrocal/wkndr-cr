angular.module("wkndrCr")
	.controller('wkndrProfile', ["$scope", "$uibModal", "Auth", function($scope, $uibModal, Auth){

		// open modal on avatar click
		$scope.openAvatarModal = function(){
			$uibModal.open({
	      ariaLabelledBy: "modal-title",
	      ariaDescribedBy: "modal-body",
	      templateUrl: "avatarModal.html",
	      controller: "avatarModalCtrl",
	      controllerAs: "$modalCtrl",
	      windowClass: "avatarModal",
	      resolve: {
	        currUser: function () {
	          return Auth.getCurrentUser();
	        }
	      }
	    });
		}

		// logout on button click
		$scope.logOut = function(){
			Auth.logOut();
		}

	}])
	.controller("avatarModalCtrl", function($scope, $uibModalInstance, upload, currUser){
		// instantiate controllerAs
		var $modalCtrl = this;

		// set user for modal
		$modalCtrl.user = currUser.user;

		// initialize avatar model for upload
		$modalCtrl.avatar = {
			imgPreview: $modalCtrl.user.avatar.url,
			imgFile: null
		};

		// initialize error bank
		$modalCtrl.errors = {
			error: false,
			messages: []
		};

		// handle image upload changes to update thumbnail
		$modalCtrl.avatarImg = function(ev){
			var fileInput = ev.target;

			if (fileInput.files && fileInput.files[0]){
				var reader = new FileReader();
		    reader.onload = function(){
		    	$scope.$apply(function(){
			      $modalCtrl.avatar.imgPreview = reader.result;
						$modalCtrl.avatar.imgFile = fileInput.files[0];
		    	});
		    };
		    reader.readAsDataURL(fileInput.files[0]);
			}
			else {
				$modalCtrl.avatar.imgPreview = $modalCtrl.user.avatar.url;
				$modalCtrl.avatar.imgFile = null;
			}
		}

		// bind upload on ok
		$modalCtrl.ok = function(){
			upload({
				url: "/auth",
				method: "PUT",
				data: {
					avatar: $modalCtrl.avatar.imgFile
				}
			}).then(
				function(response){ // success response
					// clear errors
					$modalCtrl.errors.error = false;
					$modalCtrl.errors.messages = [];
					
					// set new avatars
					// response.data.data => user data
					currUser.user.avatar = response.data.data.avatar;

					// close modal
		    	$uibModalInstance.close();				
				},
				function(response){ // error response
					// display errors
					$modalCtrl.errors.error = true;
					$modalCtrl.errors.messages = response.data.errors;
				}
			);
	  }

	  // bind close
	  $modalCtrl.cancel = function(){
	    $uibModalInstance.dismiss("cancel");
	  }
	});