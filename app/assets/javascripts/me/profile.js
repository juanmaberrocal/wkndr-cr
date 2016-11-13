angular.module("wkndrCr")
	.controller('wkndrProfile', ["$scope", "Auth", function($scope, Auth){
		$scope.logOut = function(){
			Auth.logOut();
		}
	}]);