angular.module("wkndrCr")
	.controller('wkndrEvents', ["$scope", "mobileCheck", "currRoute", "EventsResource", function($scope, mobileCheck, currRoute, EventsResource){
		// initialize calendar event source
		$scope.events = []
		$scope.eventsSource = [$scope.events];

		// configure events calendar ui
		$scope.uiConfig = {
			calendar: {
				timezone: "local",
				defaultView: (mobileCheck.isMobile() ? "listMonth" : "month"),
				editable: false,
				events: function(start, stop, timezone, callback){
					// clear current events
					$scope.events.length = 0;

					// query user events
					EventsResource.query(
						{
							start: start,
							stop: stop
						},
						function(response){
							// build event objects for calendar
							for (var i=0; i<response.length; i++){
								$scope.events.push({
									id: response[i].id,
									title: response[i].title,
									start: moment(response[i].start_date).toDate(),
									end: moment(response[i].end_date).toDate(),
									allDay: true
								})
							}
						},
						function(response){
							// todo: handle errors
						}
					)
				},
				dayClick: function(date, jsEvent, view){
					currRoute.goTo("me.events.newEvent", { date: date.toDate() })
				},
				eventClick: function(event, jsEvent, view){
					currRoute.goTo("me.showEvent", { id: event.id })
				}
			}
		}

	}]);