angular.module("wkndrCr")
	.factory("UserFriendsResource", [
		"$resource", 
		function($resource){
		return $resource("/api/v1/user_friends/:id", { id: "@id" }, {
			// CRUD
			create: { method: "POST" },
			destroy: { method: "DELETE" }
		});
	}]);