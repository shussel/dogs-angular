var app = angular.module('dogs', []);

app.controller('dogsController', ['$scope', 'dogsService', function($scope, dogsService) {
	'use strict';

	$scope.sortType     = 'id';
	$scope.sortReverse  = false;
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

app.directive('sortIndicator', function() {
  return {
	restrict: 'E',
    scope: {
		column: '@'
	},
    template: '<span ng-show="$parent.sortType == ' + "'{{column}}'" + ' && !$parent.sortReverse" class="glyphicon glyphicon-chevron-down"></span><span ng-show="$parent.sortType == ' + "'{{column}}'" + ' && $parent.sortReverse" class="glyphicon glyphicon-chevron-up"></span>'
  };
});
