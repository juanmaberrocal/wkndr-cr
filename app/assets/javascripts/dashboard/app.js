angular.module("wkndrCr", ["ui.router", "templates"])
  // define routes
  .config([
  	  "$stateProvider",
  	  "$urlRouterProvider",
  	  function($stateProvider, $urlRouterProvider){
  	  	// define states
  	  	$stateProvider
  	  	  .state("/dashboard", { // home
  	  	  	url: "/dashboard",
  	  	  	templateUrl: "dashboard/_index.html",
  	  	  	controller: "wkndrDashboard"
  	  	  })
          .state("/profile", { // profile
            url: "/profile",
            templateUrl: "dashboard/_profile.html",
            controller: "wkndrProfile"
          })

  	  	// redirect home
  	  	$urlRouterProvider.otherwise("/dashboard");
  	  }
  	]);