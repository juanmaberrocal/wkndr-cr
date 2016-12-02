angular.module("wkndrCr")
	.controller('wkndrExplore', [
		"$scope", "GMapsHelper", "LocationsResource",
		function($scope, GMapsHelper, LocationsResource){
		// set default center
		$scope.gmapCenter = GMapsHelper.defaultCenter;

		// load locations
		$scope.locations = LocationsResource.query();
	}]);