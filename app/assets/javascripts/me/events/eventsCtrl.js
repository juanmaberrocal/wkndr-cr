
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
		$scope.event = {
			start_date: currRoute.getCurrState().params.date,
			end_date: currRoute.getCurrState().params.date
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
	.controller("wkndrEditEvent", ["$scope", "currRoute", "EventsResource", function($scope, currRoute, EventsResource){
		// track if new record
		$scope.isNew = false;

		// track form errors
		$scope.formErrors = {
			errors: false,
			messages: []
		};

		// copy event record from show ctrl (parent state) into working copy
		if ($scope.$parent.event.$resolved){
			$scope.event = angular.copy($scope.$parent.event);
		}
		else {
			$scope.$parent.event.$promise.then(function(res){ $scope.event = angular.copy(res) });
		}

		// handle marker dragDrop to set new lat/lng
		$scope.gmapSetLatLng = function(ev){
			var position = this.getPosition();

			$scope.event.lat = position.lat();
			$scope.event.lng = position.lng();
		};

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