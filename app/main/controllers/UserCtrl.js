(function (ng) {
	'use strict';
     angular.module('mApp').controller('UserCtrl', UserCtrl);
     UserCtrl.$inject = ['usersFactory', '$scope', '$rootScope'];

     function UserCtrl (usersFactory, $rootScope) {
     	var vm = this;

          vm.removeUser = function(user){
               usersFactory.removeUser(user);
          };

          

/*
          vm.correspondence = function(user){
               $rootScope.$emit('user', user);
          };
*/


     }

})(angular)