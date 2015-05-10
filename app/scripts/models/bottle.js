'use strict';

angular.module('app.services')
    .factory('Bottle', function(GlobalConfig, $resource){
        return $resource(GlobalConfig.server + 'bottles/:id',
            {id: '@bottle_id'},
            {update: {method: 'PUT'}}
        );
    });

