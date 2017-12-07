(function (ng) {
     'use strict';
     angular.module('mApp').controller('UsersCtrl', UsersCtrl);
     UsersCtrl.$inject = ['usersFactory', 'msgFactory', 'chatFactory', '$q', '$scope', '$rootScope'];

     var array = [];
     function UsersCtrl (usersFactory, msgFactory, chatFactory, $q, $rootScope, $scope) {
          var vm = this;
          var fr = this;

          vm.info = 'we not authorized';

          //данные пользователя
          vm.user_id = null;
          vm.name = false;
          vm.surname = false;
          vm.authorized = false;
          vm.result = null;         

          vm.correspondence = function(user){
               $rootScope.$emit('user', user);

               vm.arr_messages = [];
               vm.getid = chatFactory.getid(user);
               vm.arr_messages = msgFactory.messages(vm.getid);

               document.cookie = "_user_id="+user.user_id;
               document.cookie = "_name="+user.name;
               document.cookie = "_surname="+user.surname;

          };
          
          vm.users = usersFactory.getUsers();

          vm.addUser = function(){
               usersFactory.addUser(vm.userName, vm.userSurname);
               vm.userName = '';
               vm.userSurname = '';
          };

          vm.enter = function(){
               var user = usersFactory.enter(vm.userName, vm.userSurname);

               vm.user_id = user.user_id;
               vm.name = user.name;
               vm.surname = user.surname;
               vm.authorized = user.authorized;

               if(vm.authorized == true) vm.info = 'we authorized';
          }

          //будим общатся с серверном через порт 3000
          //сокет возвращает OBJ для роботы с ним

          var socket = window.io('localhost:3000/');
          vm.newMessage = undefined;
          vm.arr_messages = [];


          //отправляем сообщение для тестирования

          socket.emit("test", "we are passing in a message");

          //слушаем ответ сервера

          socket.on("receive-message", function(msg){

          //$scope.$apply
          //после выполнения функции запустится цикик для обновление модели
          //выводим массив сразуже после обновления

               $scope.$apply(function(){
                    console.log("received message");
                    vm.arr_messages.push(msg);
                  });

           });      

          vm.sent = function(){

               if(vm.authorized == false) {
               vm.info = 'you can not send msg';
               vm.msg = '';
               return;
               };


               function getCookie(name) {
                    var matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    ));
                    return matches ? decodeURIComponent(matches[1]) : undefined;
               };

               var name = getCookie("_name");
               var surname = getCookie("_surname");
               var id  = getCookie("_user_id");

               var friendData = 'Кому ' + name;
               var userData = ' От ' + vm.name;
               var result = friendData + userData + ' : ' + vm.msg;
               
               //записываем в json сообщений
               var msg_id = msgFactory.add(result);

               //записываю id отправителя и получателя 2 аргумент id смс в json

               chatFactory.add(vm.user_id, msg_id);
               chatFactory.add(Number(id), msg_id);
               
               //на сервер отослал
               socket.emit("new-message", result);
               vm.newMessage = undefined;
               vm.msg = '';

          };
     
     }
})(angular)