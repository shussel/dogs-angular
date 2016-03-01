var app = angular.module('dogs', []);

app.controller('dogsController', function($scope, $http) {
	'use strict';

    $scope.dogs = [];
	$http.get('dogs.json')
		.success(function(data) {
       $scope.dogs = data;
	}).
		error(function() {
			alert('error');
	});

	$scope.sortType     = 'id';
	$scope.sortReverse  = false;
});