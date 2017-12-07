(function (ng) {
	'use strict';
     angular.module('mApp').factory('chatFactory', chatFactory);

     function chatFactory () {
      var service = {};

     	var chat = [
               {
               user_id : 1,
               msg_id : 1          
               },
               {
               user_id : 2,
               msg_id : 2          
               },
               {
               user_id : 1,
               msg_id : 3          
               },
               {
               user_id : 3,
               msg_id : 4          
               },
               {
               user_id : 1,
               msg_id : 4          
               },
               {
               user_id : 2,
               msg_id : 3          
               }
          ];

      service.getid = function(user){
        return _.filter(chat, {user_id : user.user_id}); 
      };

      service.add = function (id_user, id_msg) {

            chat.push({
            user_id : id_user,
            msg_id : id_msg
            });

      }; 

      service.getchat = function () {
        return chat;
      }; 

      return service;
    };

})(angular)