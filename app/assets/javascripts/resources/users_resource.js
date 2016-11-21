angular.module("wkndrCr")
	.factory("UsersResource", ["$resource", function($resource){
		return $resource("/api/v1/users/:id", { id: "@id" }, {
			friends: { method: "GET", url: "/api/v1/users/:id/friends", isArray: true }
		});
	}]);