(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
	.controller('dogListController', function($scope, $state, dogsService) {

		$scope.columns = ['ID','Name','Breed','Color','Weight','Owner'];
		
		$scope.sort = {
			'column': 'ID',
			'reverse': false
		}

		dogsService.getDogs().then(function(data) {
			$scope.dogs = data;
		}).catch(function() {
			$scope.error = 'unable to get the dogs';
		});
		
	})

	.service('dogsService', function($http) {

		this.getDogs = function() {

			return $http.get('assets/data/dogs.json').then(function(response) {						
						return response.data;
				   });
		}
	})

	.directive('sortHeader', function() {
	  return {
		restrict: 'A',
		scope: {
			column: '@',
			sort: '='
		},
		templateUrl: '/templates/sortHeader.html',
		bindToController: true,
		controllerAs: "ctrl",
		controller: SortHeaderController
	  };
	})

	.directive('sortHeaders', function() {
	  return {
		restrict: 'A',
		scope: {
			columns: '=',
			sort: '='
		},
		templateUrl: '/templates/sortHeaders.html',
		bindToController: true,
		controllerAs: "ctrl",
		controller: SortHeadersController
	  };
	})

    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function SortHeaderController() {
	this.toggleSort = function() {
		this.sort.column = this.column;
		this.sort.reverse = !this.sort.reverse;
	};
  }

  function SortHeadersController() {}

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
