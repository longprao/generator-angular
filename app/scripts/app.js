'use strict';

angular.module('app.controllers', ['ngMessages', 'ui.router', 'ngTable', 'app.services']);
angular.module('app.services', ['ngResource', 'app.configs']);
angular.module('app.directives', []);

angular.module('app', ['ui.router', 'ui.bootstra', 'app.configs', 'app.directives', 'app.controllers'])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $resourceProvider, GlobalConfig) {

        $resourceProvider.defaults.stripTrailingSlashes = false;

        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('base', {
                url: GlobalConfig.base,
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'views/header.html',
                        controller: 'HeaderCtrl'
                    }
                }
            })
            .state('base.index', {
                url: '',
                views: {
                    'main@': {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    }
                }
            });

        //Add trailing slash
        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.path(),
            // Note: misnomer. This returns a query object, not a search string
                search = $location.search(),
                params;

            // check to see if the path already ends in '/'
            if (path[path.length - 1] === '/') {
                return path;
            }

            // If there was no search string / query params, return with a `/`
            if (Object.keys(search).length === 0) {
                return path + '/';
            }

            // Otherwise build the search string and return a `/?` prefix
            params = [];
            angular.forEach(search, function(v, k){
                params.push(k + '=' + v);
            });
            return path + '/?' + params.join('&');
        });
    })
    /**
     * Set head title
     */
    .factory('PageTitle', function ($rootScope, $window) {
        $rootScope.pageTitle = '';

        return {
            set: function (title) {
                $window.document.title = title + ' | Quickstart';
                $rootScope.pageTitle = title;
            },

            reset: function () {
                $window.document.title = 'Quickstart';
                $rootScope.pageTitle = '';
            }
        }
    });
