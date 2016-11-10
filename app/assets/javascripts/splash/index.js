angular.module("wkndrCr")
	.controller('wkndrSplash', ["$scope", "bgChangeService", function($scope, bgChangeService){
		var bgChange; // keep track of body bg change interval
	    bgChange = bgChangeService.startBgChange({ div:$("div.jumbotron") });

	    $scope.$on("$destroy", function(){
			// stop bg change interval
			bgChangeService.stopBgChange({ interval: bgChange, div:$("div.jumbotron") });
	    });
	}]);