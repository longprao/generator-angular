'use strict';

/**
 * Loading Indicator
 *
 * @author Maikel Daloo
 * @date 12th March 2013
 *
 * Creates a new module and intercepts all ajax requests.
 * Every time a request is sent, we display the loading message and increment
 * the enable_counter variable. Then when requests complete (whether success or error)
 * we increment the disable_counter variable and we only hide the loading message
 * when the enable/disable counters are equal.
 *
 * @example
 * All that is required to get this working is to inject this module into your main
 * module. E.g.
 *     var app = angular.module('my-app', ['LoadingIndicator']);
 * Then the script will look for the element specified in the LoadingIndicatorHandler object
 * and show/hide it.
 */
angular.module('LoadingIndicator', []).
    config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$q', 'LoadingIndicatorHandler', function($q, LoadingIndicatorHandler) {
            return {
                request: function(config) {
                    LoadingIndicatorHandler.enable();
                    return config;
                },

                response: function(response) {
                    LoadingIndicatorHandler.disable();
                    return response;
                },

                responseError: function(reason) {
                    LoadingIndicatorHandler.disable();
                    // Reject the reponse so that angular isn't waiting for a response.
                    return $q.reject(reason);
                }
            };
        }]);
    }]).
    /**
     * LoadingIndicatorHandler object to show a loading animation while we load the next page or wait
     * for a request to finish.
     */
    factory('LoadingIndicatorHandler', function() {
        // The element we want to show/hide.
        var $element = angular.element(document.getElementById('loading-indicator'));

        return {
            // Counters to keep track of how many requests are sent and to know
            // when to hide the loading element.
            enableCount: 0,
            disableCount: 0,

            /**
             * Fade the blocker in to block the screen.
             *
             * @return {void}
             */
            enable: function() {
                this.enableCount++;

                if ( $element.length ) {
                    $element.addClass('show');
                }
            },

            /**
             * Fade the blocker out to unblock the screen.
             *
             * @return {void}
             */
            disable: function() {
                this.disableCount++;

                if ( this.enableCount === this.disableCount ) {
                    this.enableCount = this.disableCount = 0;
                    if ( $element.length ) {
                        $element.removeClass('show');
                    }
                }
            }
        };
    });