angular.module('app.controllers', ['xml'])

	.controller('homeCtrl', function($scope) {

	})
	      
	.controller('rssFeedCtrl', function($scope, $http, rssLoader, x2js) {
		// $rootScope.$on('$viewContentLoading', 
		// function(event, viewConfig){ 
		//     console.log('rootscope view changed');
		// });

		// Test measurement
		var start = performance.now();
		var url = 'http://www.svtplay.se/agenda/rss.xml';
		var feed = {};

		// Get the feed
		rssLoader.fetch({q: url, num: 10}, {}, function (data) {
			// Convert the xml string response to json
	        var json = x2js.xml_str2json( data.responseData.xmlString );
	        feed = json.rss.channel;
	        console.log(feed);
			$scope.feed = feed; 
		});

		var end = performance.now();

		$scope.executionTime = end-start;

		$scope.$on('$viewContentLoaded', 
		function(event){
			console.log('asdasfasd');
		});
	})

	.controller('primeCalcCtrl', function($scope) {
		console.log("inside prime calc ctrl");

		$scope.getPrimes = function(max) {
			var pre = performance.now();
		    var sieve = [], i, j, primes = [];
		    for (i = 2; i <= max; ++i) {
		        if (!sieve[i]) {
		            // i has not been marked -- it is prime
		            primes.push(i);
		            for (j = i << 1; j <= max; j += i) {
		                sieve[j] = true;
		            }
		        }
		    }

		    var post = performance.now();
		    $scope.primesExecutionTime = post-pre;
		    $scope.primes = primes;
		}

		$scope.resetPrimes = function() {
			delete $scope.primesExecutionTime;
			delete	$scope.primes;
		}
	})