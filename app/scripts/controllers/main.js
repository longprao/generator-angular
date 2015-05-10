'use strict';

angular.module('app.controllers')
	.controller('MainCtrl', function ($scope, $stateParams, ngTableParams, PageTitle, Bottle) {
        PageTitle.reset();
        
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];

		$scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                id: 'desc'     // initial sorting
            }
        }, {
            total: 10,           // length of data
            getData: function ($defer, params) {

                Bottle.get(angular.extend(params.url(), {id: $stateParams.id}), function (result) {
                    $defer.resolve(result.items);
                    params.total(result.total);
                });
            }
        });
	});
