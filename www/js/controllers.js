angular.module('app.controllers', ['xml'])

	.controller('homeCtrl', function($scope) {

	})
	      
	.controller('rssFeedCtrl', function($scope, $http, $httpParamSerializerJQLike, x2js, $timeout) {
		$scope.testCount = 0;

		$scope.resetFeed = function() {
			delete $scope.executionTime;
			delete $scope.rssFeedChannel;
			delete $scope.runButton;
		}

		$scope.getFeed = function(rssLength) {
			// Reset the feed first
			delete $scope.executionTime;
			delete $scope.rssFeedChannel;

			// Declare initial stuff
			var rssFilePath = "";
			var fullRssFeed = {};
			$scope.rssLength = rssLength;
			$scope.testCount++;

			// Set the path to the xml file
			switch(rssLength) {
				case 10:
					rssFilePath = "rss/rss10.xml";
					$scope.runButton = document.getElementById('rss10-run-button');
					break;
				case 100:
					rssFilePath = "rss/rss100.xml";
					$scope.runButton = document.getElementById('rss100-run-button');
					break;
				case 1000:
					rssFilePath = "rss/rss1000.xml";
					$scope.runButton = document.getElementById('rss1000-run-button');
					break;
				default:
					console.log("rssLength error");
					break;
			}
			
			var start = performance.now();
			// Get the xml file
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
			      	'feed_length' : $scope.rssLength,
			      	'exec_time' : $scope.executionTime
			      })
			    }).then(function successCallback(response) {
			        console.log(response);

			        // Automatic data collection by triggering another click
			        $timeout(function() {
			        	if ($scope.runButton == null || $scope.testCount >= 1000) {
			        		console.log("Measurements done.");
			        		return;
			        	}
			            angular.element($scope.runButton).triggerHandler('click');
			        }, 1000);

			      }, function errorCallback(response) {
			        console.log('AJAX API Error: ');
			        console.log(response);
			      });

			});

		}
	})

	.controller('primeCalcCtrl', function($scope, $http, $httpParamSerializerJQLike, $timeout) {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		$scope.testCount = 0;

		$scope.getPrimes = function() {
			$scope.testCount++;
			$scope.runButton = document.getElementById('prime-run-button');

			// sieve of eratosthenes
			var primes_max = 100000;
			console.log("Primes_max: " + primes_max);
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

		        // Automatic data collection by triggering another click
		        $timeout(function() {
		        	if ($scope.runButton == null || $scope.testCount >= 1000) {
		        		console.log("Measurements done.");
		        		return;
		        	}
		            angular.element($scope.runButton).triggerHandler('click');
		        }, 1000);

		      }, function errorCallback(response) {
		        console.log('AJAX API Error: ');
		        console.log(response);
		      });

		    //$scope.primes = primes;
		}

		$scope.resetPrimes = function() {
			delete $scope.primesExecutionTime;
			delete $scope.primes;
			delete $scope.runButton;
		}
	})