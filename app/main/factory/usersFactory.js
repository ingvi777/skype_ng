(function (ng) {
	'use strict';
     angular.module('mApp').factory('usersFactory', usersFactory);

     function usersFactory () {
      var service = {};

     	var users = [
             {
               user_id : 1,
               name : 'Vova',
               surname : 'Ivanov',
               authorized : false
               },
               {
               user_id : 2,
               name : 'Dima',
               surname : 'Kyznecov',
               authorized : false
               },
               {
               user_id : 3,
               name : 'Tolik',
               surname : 'Polanski',
               authorized : false
             }
          ];

      service.getUsers = function () {
        return users;
      };

      service.addUser = function (userName, userSurname) {
        var prov = true;
        if(userName == '' | userSurname == '') prov = false;
        

        users.forEach(function(item, i, arr) {
          if(item.name == userName && item.surname == userSurname){
            prov = false;
           }
        });

        if(prov === true){
            users.push({
            id : _.uniqueId('user_'),
            name : userName,
            surname : userSurname
            });
        };
      };

      service.removeUser = function(user){
        _.pull(users, user); 
      };

      service.enter = function(nam, sur){
        var user = false;
          users.forEach(function(item, i, arr) {
          if(item.name == nam && item.surname == sur){
            item.authorized = true;
            user = item;
              };
          });
          //console.log(user);
          return user;
      };


      return service;
    };

})(angular)