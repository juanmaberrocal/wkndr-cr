angular.module("wkndrCr")
	.controller("wkndrSplash", [
		"$scope", "bgChangeService", 
		function($scope, bgChangeService){
		// click function to expand/collapse jumbo text container
		$scope.expandCollapseJumbo = function(ev){
			var $this = $(ev.currentTarget),
				container = $this.parent();
			// toggle collapse
			container.toggleClass("collapsed");
		}

		var bgChange; // keep track of body bg change interval
	    bgChange = bgChangeService.startBgChange({ div:$("div.jumbotron") });

	    $scope.$on("$destroy", function(){
			// stop bg change interval
			bgChangeService.stopBgChange({ interval: bgChange, div:$("div.jumbotron") });
	    });
	}]);