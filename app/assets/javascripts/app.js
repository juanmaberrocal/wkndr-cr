angular.module("wkndrCr", [
    "ngAnimate", 
    "ngTouch", 
    "ui.router", 
    "ngResource",
    "ui.bootstrap", 
    "lr.upload", 
    "ui.calendar",
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
          /*
          events states
          */
          .state("me.events", { // root
            url: "/me/events",
            templateUrl: "me/_events.html",
            controller: "wkndrEvents"
          })
          // nested events states
          .state("me.events.newEvent", { // new
            url: "/new",
            templateUrl: "me/events/_form.html",
            controller: "wkndrNewEvent",
            params: {
              location_id: { value: null }, 
              date: { value: (new Date()) }
            }
          })
          .state("me.showEvent", { // show
            url: "/me/events/:id",
            templateUrl: "me/events/_show.html",
            controller: "wkndrShowEvent"
          })
          .state("me.showEvent.editEvent", { // edit
            url: "/edit",
            templateUrl: "me/events/_form.html",
            controller: "wkndrEditEvent"
          })
          /*
          explore states
          */
          .state("me.explore", { // root
            url: "/me/explore",
            templateUrl: "me/_explore.html",
            controller: "wkndrExplore"
          })
          // nested explore states
          // locations
          .state("me.explore.newLocation", { // new
            url: "/locations/new",
            templateUrl: "me/locations/_form.html",
            controller: "wkndrNewLocation"
          })
          .state("me.showLocation", { // show
            url: "/me/explore/locations/:id",
            templateUrl: "me/locations/_show.html",
            controller: "wkndrShowLocation"
          })
          .state("me.showLocation.editLocation", { // edit
            url: "/edit",
            templateUrl: "me/locations/_form.html",
            controller: "wkndrEditLocation"
          })
          /*
          profile states
          */
          .state("me.profile", { // root
            url: "/me/profile",
            templateUrl: "me/_profile.html",
            controller: "wkndrProfile"
          });

  	  	// redirect home
  	  	$urlRouterProvider.otherwise("/");

        // use non-hashbang urls
        // if(window.history && window.history.pushState){
        //   $locationProvider.html5Mode(true);
        // }
  	  }
  	])
  .run(["currRoute", "Auth", "mobileCheck", function(currRoute, Auth, mobileCheck){
    // run mobile check
    mobileCheck.init();
  }])