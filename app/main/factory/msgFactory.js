(function (ng) {
	'use strict';
     angular.module('mApp').factory('msgFactory', msgFactory);

     function msgFactory () {
      var service = {};

     	var messages = [
               {
               msg_id : 1,
               message : 'Привет мир!'
               },
               {
               msg_id : 2,
               message : 'Пока!'
               },
               {               
               msg_id : 3,
               message : 'Зайнят!'
               },
               {               
               msg_id : 4,
               message : 'Нормально!'
               },
               {               
               msg_id : 5,
               message : 'А ты как!'
               }
          ];

      /**
          * @method messages
          * Returns the message.
      */

      service.messages = function(response){
        var result = [];

         response.forEach(function(item, index, arr) {

          messages.forEach(function(val, key, array){
            if(item.msg_id == val.msg_id){
              result.push(val.message);
            };
          });
         });
         return result; 
      };

      /**
          * @method add
          * Write to the messages.
      */

      service.add = function (msg) {
        var id = _.uniqueId('msg_');

            messages.push({
            msg_id : id,
            message : msg
            });

        return id;
      };

      /**
          * @method getmsg
          * Returns an object.
      */

      service.getmsg = function () {
        return messages;
      };

      return service;
    };

})(angular)