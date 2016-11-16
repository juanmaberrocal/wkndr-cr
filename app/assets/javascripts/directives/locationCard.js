angular.module("wkndrCr")
	.directive("locationCard", function(currRoute) {
	  return {
	    restrict: "E",
	  	scope: {
	  		location: "="
	  	},
	  	templateUrl: "me/directives/_location_card.html",
	    link: function (scope, element, attrs) {
	    	element.on("click", function(ev){
	    		currRoute.goTo("me.editLocation", { id: scope.location.id })
	    	});
	    }
	  };
	});