var app = angular.module('dogs', []);

app.controller('dogsController', function($scope, dogsService) {
	'use strict';

	$scope.sortType     = 'id';
	$scope.sortReverse  = false;
    dogsService.getDogs().then(function(data) {
		$scope.dogs = data;
	}).catch(function() {
		$scope.error = 'unable to get the dogs';
	});
	
});

app.service('dogsService', function($http, $q) {

	this.getDogs = function() {

		return $http.get('dogs.json').then(function(response) {
					return response.data;
			   });
	}
});
