
angular.module("wkndrCr")
	// new
	.controller("wkndrNewEvent", [
		"$scope", "currRoute", "calendarHelper", "EventsResource", 
		function($scope, currRoute, calendarHelper, EventsResource){
		// track if new record
		$scope.isNew = true;

		// set calendar picker opts
		$scope.calendarPicker = {
			format: calendarHelper.defaultDateFormat,
			formatValidation: calendarHelper.defaultDateFormatRegex,
			options: calendarHelper.defaultOptions,
			onClick: function(cal){
				if (!$scope.hasOwnProperty(cal)){
					$scope[cal] = null;
				}
				$scope[cal] = true;
			}
		}

		// track form errors
		$scope.formErrors = {
			errors: false,
			messages: []
		};

		// initialize new event
		var params = currRoute.getCurrState().params;
		$scope.event = {
			location_id: params.location_id,
			start_date: params.date,
			end_date: params.date
		};

		// handle form submission
		$scope.eventSubmit = function(){
			EventsResource.create(
				$scope.event, 
				function(response){ // success handling after update
					// remove errors
					$scope.formErrors.errors = false;
					$scope.formErrors.messages = [];
					// redirect to event
					currRoute.goTo("me.showEvent", { id: response.id });
				}, function(response){ // error handling from server
					// add errors
					$scope.formErrors.errors = true;
					$scope.formErrors.messages = response.data.errors;
				});
		};

		// return to prev page
		$scope.eventCancel = function(){
			currRoute.goBack();
		};
	}])
	// show
	.controller("wkndrShowEvent", ["$scope", "currRoute", "calendarHelper", "GMapsHelper", "EventsResource", function($scope, currRoute, calendarHelper, GMapsHelper, EventsResource){
		// set calendar format
		$scope.calendarFormat = calendarHelper.defaultDateFormat;

		// set default gmap location
		$scope.defaultCenter = GMapsHelper.defaultCenter;

		// load record
		var eventId = currRoute.getCurrState().params.id;
		$scope.eventLoad = EventsResource.read(
			{ id: eventId }, 
			function(response){
				// set records
				$scope.event = response.event;
				$scope.location = response.location;
				$scope.users = response.users;
				// $scope.comments = [];
			},
			function(response){
				// display errors
				$scope.hasErrors = true;
				$scope.errors = response.data.errors;
			}
		);
	}])
	// edit
	.controller("wkndrEditEvent", ["$scope", "currRoute", "calendarHelper", "EventsResource", function($scope, currRoute, calendarHelper, EventsResource){
		// track if new record
		$scope.isNew = false;

		// set calendar picker opts
		$scope.calendarPicker = {
			format: calendarHelper.defaultDateFormat,
			formatValidation: calendarHelper.defaultDateFormatRegex,
			options: calendarHelper.defaultOptions,
			onClick: function(cal){
				if (!$scope.hasOwnProperty(cal)){
					$scope[cal] = null;
				}
				$scope[cal] = true;
			}
		}

		// track form errors
		$scope.formErrors = {
			errors: false,
			messages: []
		};

		// copy event record from show ctrl (parent state) into working copy
		// convert dates to jsObjects for datepicker
		if ($scope.$parent.eventLoad.$resolved){
			$scope.event = angular.copy($scope.$parent.event);
			$scope.event.start_date = moment($scope.event.start_date).toDate();
			$scope.event.end_date = moment($scope.event.end_date).toDate();
		}
		else {
			$scope.$parent.eventLoad.$promise.then(function(res){ 
				$scope.event = angular.copy(res.event);
				$scope.event.start_date = moment($scope.event.start_date).toDate();
				$scope.event.end_date = moment($scope.event.end_date).toDate();
			});
		}

		// handle form submission
		$scope.eventSubmit = function(){
			EventsResource.update(
				$scope.event, 
				function(response){ // success handling after update
					// remove errors
					$scope.formErrors.errors = false;
					$scope.formErrors.messages = [];
					// redirect to event
					currRoute.goTo("me.showEvent", { id: response.id }, { reload: true });
				}, function(response){ // error handling from server
					// add errors
					$scope.formErrors.errors = true;
					$scope.formErrors.messages = response.data.errors;
				});
		};

		// return to prev page
		$scope.eventCancel = function(){
			currRoute.goBack();
		};
	}])
	.controller("wkndrEditEventLocation", ["$scope", "currRoute", "EventsResource", "LocationsResource", function($scope, currRoute, EventsResource, LocationsResource){
		// get set location
		$scope.location_id = currRoute.getCurrState().params.location_id;

		// track errors
		$scope.formErrors = {
			errors: false,
			messages: []
		};

		// load locations &&
		$scope.locations = LocationsResource.query({},
			function(response){ // success handle
				// set init selected card
				$("div#locationCardSelection").find("#locationId_" + $scope.location_id).addClass("btn-primary"); 
			},
			function(response){ // error handle
				// display errors
				$scope.formErrors.errors = true;
				$scope.formErrors.messages = response.data.errors;
			});

		// bind location card click to set location
		$scope.setLocation = function(ev, ele){
			$scope.$apply(function(){
				// set new location id from card
				$scope.location_id = $(ele).attr("id").replace("locationId_", "");
			});

			// update display of selected location card
			$("div#locationCardSelection").find("location-card").removeClass("btn-primary");
			$(ele).addClass("btn-primary");
		}

		// bind select submit
		$scope.locationSelect = function(){
			EventsResource.update(
				{
					id: currRoute.getCurrState().params.id,
					location_id: $scope.location_id
				}, 
				function(response){ // success handling after update
					// remove errors
					$scope.formErrors.errors = false;
					$scope.formErrors.messages = [];
					// redirect to event
					currRoute.goTo("me.showEvent", { id: response.id }, { reload: true });
				}, function(response){ // error handling from server
					// add errors
					$scope.formErrors.errors = true;
					$scope.formErrors.messages = response.data.errors;
				});
		};
	}]);