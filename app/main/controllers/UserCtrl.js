(function (ng) {
	'use strict';
     angular.module('mApp').controller('UserCtrl', UserCtrl);
     UserCtrl.$inject = ['usersFactory', '$scope', '$rootScope'];

     function UserCtrl (usersFactory, $rootScope) {
     	var vm = this;

          /**
          * @function removeUser
          * By clicking delete the user.
          */

          vm.removeUser = function(user){
               usersFactory.removeUser(user);
          };

     }

})(angular)