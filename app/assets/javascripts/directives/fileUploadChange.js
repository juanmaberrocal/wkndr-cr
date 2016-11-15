angular.module("wkndrCr")
	.directive("fileUploadChange", function() {
	  return {
	    restrict: "A",
	    link: function (scope, element, attrs) {
	      var onChangeHandler = scope.$eval(attrs.fileUploadChange);
	      element.bind('change', onChangeHandler);
	    }
	  };
	});