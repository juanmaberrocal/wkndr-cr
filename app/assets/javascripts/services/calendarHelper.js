angular.module("wkndrCr")
	.service("calendarHelper", [
		"$rootScope", 
		function($rootScope){
		// set this for nested calls
		var self = this;

		// control default date format
		self.defaultDateFormat = "MM/dd/yyyy";
		self.defaultDateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;

		// control default calendar popup options
		self.defaultOptions = {
			initDate: (new Date()),
			// minDate: (new Date()),
			showWeeks: false
		};

	}])