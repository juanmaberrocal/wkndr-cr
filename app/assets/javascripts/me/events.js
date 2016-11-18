angular.module("wkndrCr")
	.controller('wkndrEvents', ["$scope", "mobileCheck", function($scope, mobileCheck){
		$scope.events = [];

		// configure events calendar ui
		$scope.uiConfig = {
			calendar: {
				defaultView: (mobileCheck.isMobile() ? "listMonth" : "month"),
				editable: false
			}
		}
	}]);