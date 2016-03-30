angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  // Disable all caching of views
  $ionicConfigProvider.views.maxCache(0);

  // Enable cross-domain requests
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.rssFeed', {
    url: '/rss',
    views: {
      'tab2': {
        templateUrl: 'templates/rssFeed.html',
        controller: 'rssFeedCtrl'
      }
    }
  })

  .state('tabsController.primeCalc', {
    url: '/primecalc',
    views: {
      'tab3': {
        templateUrl: 'templates/primeCalc.html',
        controller: 'primeCalcCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/home')

  

});