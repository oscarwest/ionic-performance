angular.module('app.controllers', ['xml'])

	.controller('homeCtrl', function($scope) {

	})
	      
	.controller('rssFeedCtrl', function($scope, $http, $httpParamSerializerJQLike, x2js) {

		$scope.resetFeed = function() {
			delete $scope.executionTime;
			delete $scope.rssFeedChannel;
		}

		$scope.getFeed = function(rssFilePath) {
			// Reset the feed first
			delete $scope.executionTime;
			delete $scope.rssFeedChannel;
			
			var start = performance.now();
			var fullRssFeed = {};

			// Get the correct feed
			$http.get(rssFilePath, {
				transformResponse: function(xml) {
					var json = x2js.xml_str2json( xml );
					return json;
				}
			})
			.success(function (json) {
				fullRssFeed = json;
				$scope.rssFeedChannel = fullRssFeed.rss.channel;

				// End the count
				var end = performance.now();
				$scope.executionTime = end-start;
			});

			// Get the images

		    // Insert to database
		    $http({
		      method: 'POST',
		      url: 'http://192.168.1.109:80/exjobb-data-api/index.php',
		      headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
              },
		      data: $httpParamSerializerJQLike({
		      	'app_type' : 'hybrid',
		      	'app_function' : 'rss',
		      	'exec_time' : $scope.executionTime
		      })
		    }).then(function successCallback(response) {
		        console.log(response);
		      }, function errorCallback(response) {
		        console.log('AJAX API Error: ');
		        console.log(response);
		      });
		}
	})

	.controller('primeCalcCtrl', function($scope, $http, $httpParamSerializerJQLike) {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		console.log("inside prime calc ctrl");

		// sieve of eratosthenes
		$scope.getPrimes = function() {
			var primes_max = 100000;
			var pre = performance.now();
		    var sieve = [], i, j, primes = [];
		    for (i = 2; i <= primes_max; ++i) {
		        if (!sieve[i]) {
		            primes.push(i);
		            for (j = i << 1; j <= primes_max; j += i) {
		                sieve[j] = true;
		            }
		        }
		    }

		    var post = performance.now();
		    $scope.primesExecutionTime = post-pre;
		    console.log("Test rounding foFixed: " + $scope.primesExecutionTime.toFixed(6));

		    // Insert to database
		    $http({
		      method: 'POST',
		      url: 'http://192.168.1.109:80/exjobb-data-api/index.php',
		      headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
              },
		      data: $httpParamSerializerJQLike({
		      	'app_type' : 'hybrid',
		      	'app_function' : 'prime',
		      	'exec_time' : $scope.primesExecutionTime,
		      	'primes' : primes_max
		      })
		    }).then(function successCallback(response) {
		        console.log(response);
		      }, function errorCallback(response) {
		        console.log('AJAX API Error: ' + response);
		        console.log(response);
		      });

		    //$scope.primes = primes;
		}

		$scope.resetPrimes = function() {
			delete $scope.primesExecutionTime;
			delete $scope.primes;
		}
	})