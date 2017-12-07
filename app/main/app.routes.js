(function (ng) {
	'use strict';
	ng.module('mApp.routes',['ngRoute'])
	.config(function($routeProvider) {
	  $routeProvider.
	    when('/', {
	      templateUrl: '/app/main/views/chat.html',
	      controller : 'UsersCtrl'
	    }).
	    otherwise({
	      redirectTo: '/'
	    });
	});
})(angular)