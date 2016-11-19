angular.module("wkndrCr")
	.factory("EventsResource", ["$resource", function($resource){
		return $resource("/api/v1/events/:id", { id: "@id" }, {
			// index query all
			query: { method: "GET", isArray: true },
			// CRUD
			create: { method: "POST" },
			read: { method: "GET" },
			update: { method: "PUT" },
			destroy: { method: "DELETE" }
		});
	}]);