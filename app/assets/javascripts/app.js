angular.module("wkndrCr", ["ui.router", "ng-token-auth", "templates"])
  // define routes
  .config([
  	  "$stateProvider",
  	  "$urlRouterProvider",
      "$locationProvider",
      "$authProvider",
  	  function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider){
        // define authentication API
        $authProvider
          .configure({ // todo: set proper URLs for environments
            apiUrl: "http://localhost:3000",
            confirmationSuccessUrl: "http://localhost:3000#/login" // redirect to login after confirmation
          });

  	  	// define states
  	  	$stateProvider
          // splash states
          // no authentication required
  	  	  .state("root", { // home
  	  	  	url: "/",
  	  	  	templateUrl: "splash/_index.html",
  	  	  	controller: "wkndrSplash"
  	  	  })
          .state("login", { // login
            url: "/login",
            templateUrl: "splash/_login.html",
            controller: "wkndrLogin"
          })
          .state("signup", { // signup
            url: "/signup",
            templateUrl: "splash/_signup.html",
            controller: "wkndrSignup"
          })
          // dashboard states
          // authentication required
          .state("me", {
            abstract: true,
            template: "<ui-view/>", // wrapper for child authenticated views
            resolve: {
              auth: function($auth){
                console.log("gotta check!")
                return $auth.validateUser();
              }
            }
          })
          .state("me.dashboard", { // dashboard
            url: "/dashboard",
            templateUrl: "dashboard/_index",
            controller: "wkndrDashboard"
          })
          .state("me.profile", {
            url: "/profile",
            templateUrl: "dashboard/_profile",
            controller: "wkndrProfile"
          })
          ;

  	  	// redirect home
  	  	$urlRouterProvider.otherwise("/");

        // use non-hashbang urls
        // if(window.history && window.history.pushState){
        //   $locationProvider.html5Mode(true);
        // }
  	  }
  	])
  .run(["Auth", function(Auth){

  }])