angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('rssLoader', function($http, $resource){
	return $resource('//ajax.googleapis.com/ajax/services/feed/load', {}, {
		fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK', output: 'xml'}}
	});
})