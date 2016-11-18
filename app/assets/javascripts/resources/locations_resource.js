angular.module("wkndrCr")
	.factory("LocationsResource", ["$resource", function($resource){
		return $resource("/api/v1/locations/:id", { id: "@id" }, {
			// index query all
			query: { method: "GET", isArray: true },
			// CRUD
			create: { method: "POST" },
			read: { method: "GET" },
			update: { method: "PUT" },
			destroy: { method: "DELETE" }
		});
	}]);