angular.module("wkndrCr")
	.directive("locationCard", [
		function(currRoute) {
	  return {
	    restrict: "E",
	  	scope: {
	  		location: "=",
	  		noClick: "=",
	  		replaceClick: "="
	  	},
	  	templateUrl: "directives/_location_card.html",
	    link: function (scope, element, attrs) {
	    	if (typeof attrs.noClick != "undefined"){
	    		// no binding
	    	}
	    	else if (typeof attrs.replaceClick != "undefined"){
	    		// custom binding
	    		element.on("click", function(ev){
	    			scope.replaceClick(ev, element);
	    		});
	    	}
	    	else {
	    		// default click navigation
		    	element.on("click", function(ev){
		    		currRoute.goTo("me.showLocation", { id: scope.location.id })
		    	});
	    	}
	    }
	  };
	}]);