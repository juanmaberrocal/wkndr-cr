
// show
angular.module("wkndrCr")
	.controller("wkndrShowLocation", ["$scope", "currRoute", "LocationsResource", function($scope, currRoute, LocationsResource){
		// track if new record
		$scope.isNew = false;

		// load record
		var locationId = currRoute.getCurrState().params.id;
		$scope.location = LocationsResource.read(
			{ id: locationId }, 
			function(response){
				// set record
				$scope.location = response;
			},
			function(response){
				// display errors
				$scope.hasErrors = true;
				$scope.errors = response.data.errors;
			}
		);
	}])
	.controller("wkndrEditLocation", ["$scope", "currRoute", "LocationsResource", function($scope, currRoute, LocationsResource){
		// track form errors
		$scope.formErrors = {
			errors: false,
			messages: []
		}

		// copy location record from show ctrl (parent state) into working copy
		if ($scope.$parent.location.$resolved){
			$scope.location = angular.copy($scope.$parent.location);
		}
		else {
			$scope.$parent.location.$promise.then(function(res){ $scope.location = angular.copy(res) });
		}

		// handle marker dragDrop to set new lat/lng
		$scope.gmapSetLatLng = function(ev){
			var position = this.getPosition();

			$scope.location.lat = position.lat();
			$scope.location.lng = position.lng();
		}

		// handle form submission
		$scope.locationSubmit = function(){
			LocationsResource.update(
				$scope.location, 
				function(response){ // success handling after update
					// remove errors
					$scope.formErrors.errors = false;
					$scope.formErrors.messages = [];
					// redirect to location
					currRoute.goTo("me.showLocation", { id: response.id }, { reload: true });
				}, function(response){ // error handling from server
					// add errors
					console.log(response)
					$scope.formErrors.errors = true;
					$scope.formErrors.messages = response.data.errors;
				});
		}

		// return to prev page
		$scope.locationCancel = function(){
			currRoute.goBack();
		}
	}])