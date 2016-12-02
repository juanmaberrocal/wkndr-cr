/* 
  switch background class to cycle background images
  service provides:
    - bg interval switch
    - bg removal
  */
angular.module("wkndrCr")
	.factory("bgChangeService", [
		function($interval){
	    var $this = this,
	        bgClasses = ["wkndr-bg-1", "wkndr-bg-2", "wkndr-bg-3"]; // map backgrounds available

	    // return service methods
	    return {
	    	/*
	    	start background interval change
	    	returns interval (required to stop)
	    	*/
	    	startBgChange: function(data){
	    		// add initial background if necessary
		        if (!/wkndr-bg-\d+/.test(data.div.attr("class"))){
		          data.div.addClass("wkndr-bg-1");
		        }

		        // set interval for bg change
		        return $interval(function(){
		          if (data.div.hasClass("wkndr-bg-1")){
		            data.div.addClass("wkndr-bg-2").removeClass("wkndr-bg-1");
		          }
		          else if (data.div.hasClass("wkndr-bg-2")){
		            data.div.addClass("wkndr-bg-3").removeClass("wkndr-bg-2");
		          }
		          else {
		            data.div.addClass("wkndr-bg-1").removeClass("wkndr-bg-3");
		          }
		        }, 5000);
	    	},
	    	/*
	    	stop background interval change
	    	destroy interval and removes background classes
	    	*/
	    	stopBgChange: function(data){
	    		// destroy interval
				$interval.cancel(data.interval);
				data.interval = undefined;
				
				// remove background
				if (/wkndr-bg-\d+/.test(data.div.attr("class"))){
		          data.div.removeClass("wkndr-bg-1 wkndr-bg-2 wkndr-bg-3");
		        }
	    	}
	    }
	}]);
