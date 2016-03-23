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