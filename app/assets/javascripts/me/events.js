angular.module("wkndrCr")
	.controller('wkndrEvents', ["$scope", "mobileCheck", "currRoute", function($scope, mobileCheck, currRoute){
		$scope.events = [];

		// configure events calendar ui
		$scope.uiConfig = {
			calendar: {
				timezone: "local",
				defaultView: (mobileCheck.isMobile() ? "listMonth" : "month"),
				editable: false,
				dayClick: function(date, jsEvent, view){
					currRoute.goTo("me.events.newEvent", { date: date.toDate() })
				}
			}
		}
	}]);