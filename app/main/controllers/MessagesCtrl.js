(function (ng) {
	'use strict';
     angular.module('mApp').controller('MessagesCtrl', MessagesCtrl);
     MessagesCtrl.$inject = ['chatFactory', 'msgFactory', '$rootScope', '$scope'];

     function MessagesCtrl (chatFactory, msgFactory, $rootScope) {
          
     	var vm = this;
          vm.messages = undefined;
          vm.getid = undefined;

          $rootScope.$on('user', function (event, user) {
               vm.getid = chatFactory.getid(user);
               vm.messages = msgFactory.messages(vm.getid);
               console.log(vm.messages); 
          });
          
     }
})(angular)
