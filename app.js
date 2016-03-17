var app = angular.module('dogs', []);

app.controller('dogsController', ['$scope', 'dogsService', function($scope, dogsService) {
	'use strict';

	$scope.sort = {
		'column': 'ID',
		'reverse': false
	}

    dogsService.getDogs().then(function(data) {
		$scope.dogs = data;
	}).catch(function() {
		$scope.error = 'unable to get the dogs';
	});
	
}]);

app.service('dogsService', ['$http', function($http) {

	this.getDogs = function() {

		return $http.get('dogs.json').then(function(response) {
					return response.data;
			   });
	}
}]);

app.directive('sortHeader', function() {
  return {
	restrict: 'A',
    scope: {
		column: '@',
		sort: '='
	},
    templateUrl: 'sortHeader.html',
	controller: function($scope) {

		$scope.toggleSort = function() {
			$scope.sort.column = $scope.column;
			$scope.sort.reverse = !$scope.sort.reverse;
		};
	}
  };
});
