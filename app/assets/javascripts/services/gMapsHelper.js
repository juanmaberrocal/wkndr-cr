angular.module("wkndrCr")
	.service("GMapsHelper", ["$rootScope", function($rootScope){
		// set this for nested calls
		var self = this;

		// control default center location
		self.defaultCenter = {
			lat: 9.933921,
			lng: -84.1065559
		};

	}])