angular.module("wkndrCr")
	.controller('wkndrExplore', ["$scope", "LocationsResource", function($scope, LocationsResource){
		// load locations
		$scope.locations = LocationsResource.query();

		console.log($scope.locations)

	}]);