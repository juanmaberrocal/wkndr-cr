angular.module("wkndrCr", [
    "ngAnimate", 
    "ngTouch", 
    "ui.router", 
    "ui.bootstrap", 
    "lr.upload", 
    "ngMap",
    "ng-token-auth", 
    "templates"
  ])
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
            confirmationSuccessUrl: null,
            omniauthWindowType: "newWindow",
            authProviderPaths: {
              facebook: "/auth/facebook"
            }
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
          // info states
          // no authentication required
          .state("info", {
            abstract: true,
            templateUrl: "layouts/_info.html" // wrapper for info views
          })
          .state("info.about", { // about
            url: "/about",
            templateUrl: "info/_about",
            controller: "wkndrAbout"
          })
          // info - legal states
          .state("info.legal", {
            url: "/legal",
            templateUrl: "layouts/_legal.html", // wrapper for legal views
            resolve: {
              currRoute: function(currRoute){
                return currRoute.getCurrState()
              }
            }
          })
          .state("info.legal.terms", { // terms and conditions
            url: "/terms",
            templateUrl: "info/legal/_terms_conditions.html"
          })
          .state("info.legal.privacy", { // privacy policy
            url: "/privacy",
            templateUrl: "info/legal/_privacy_policy.html"
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
          .state("me.events", { // events
            url: "/me/events",
            templateUrl: "me/_events.html",
            controller: "wkndrEvents"
          })
          .state("me.explore", { // explore
            url: "/me/explore",
            templateUrl: "me/_explore.html",
            controller: "wkndrExplore"
          })
          .state("me.profile", { // profile
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
  .run(["currRoute", "Auth", function(currRoute, Auth){
  }])