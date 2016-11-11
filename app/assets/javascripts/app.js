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
            apiUrl: "",
            confirmationSuccessUrl: "http://localhost:3000#/login" // redirect to login after confirmation
          });

  	  	// define states
  	  	$stateProvider
          // splash states
          // no authentication required
          .state("splash", {
            abstract: true,
            templateUrl: "layouts/_splash.html" // wrapper for splash views
          })
  	  	  .state("splash.root", { // home
  	  	  	url: "/",
  	  	  	templateUrl: "splash/_index.html",
  	  	  	controller: "wkndrSplash"
  	  	  })
          .state("splash.login", { // login
            url: "/login",
            templateUrl: "splash/_login.html",
            controller: "wkndrLogin"
          })
          .state("splash.signup", { // signup
            url: "/signup",
            templateUrl: "splash/_signup.html",
            controller: "wkndrSignup"
          })
          // dashboard states
          // authentication required
          .state("me", {
            abstract: true,
            templateUrl: "layouts/_me.html", // wrapper for child authenticated views
            resolve: {
              auth: function($auth){
                return $auth.validateUser();
              }
            }
          })
          .state("me.dashboard", { // dashboard
            url: "/me/dashboard",
            templateUrl: "me/_index.html",
            controller: "wkndrDashboard"
          })
          .state("me.profile", {
            url: "/me/profile",
            templateUrl: "me/_profile.html",
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