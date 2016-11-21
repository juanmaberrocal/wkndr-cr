
angular.module("wkndrCr")
	// new
	.controller("wkndrNewEvent", ["$scope", "currRoute", "calendarHelper", "EventsResource", function($scope, currRoute, calendarHelper, EventsResource){
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
	.controller("wkndrShowEvent", ["$scope", "currRoute", "EventsResource", function($scope, currRoute, EventsResource){
		// load record
		var eventId = currRoute.getCurrState().params.id;
		$scope.event = EventsResource.read(
			{ id: eventId }, 
			function(response){
				// set record
				$scope.event = response;
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
		if ($scope.$parent.event.$resolved){
			$scope.event = angular.copy($scope.$parent.event);
			$scope.event.start_date = moment($scope.event.start_date).toDate();
			$scope.event.end_date = moment($scope.event.end_date).toDate();
		}
		else {
			$scope.$parent.event.$promise.then(function(res){ 
				$scope.event = angular.copy(res);
				$scope.event.start_date = moment(res.start_date).toDate();
				$scope.event.end_date = moment(res.end_date).toDate();
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
	}]);