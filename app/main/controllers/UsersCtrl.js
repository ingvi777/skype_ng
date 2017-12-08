(function (ng) {
     'use strict';
     angular.module('mApp').controller('UsersCtrl', UsersCtrl);
     UsersCtrl.$inject = ['usersFactory', 'msgFactory', 'chatFactory', '$q', '$scope', '$rootScope'];

     var array = [];
     function UsersCtrl (usersFactory, msgFactory, chatFactory, $q, $rootScope, $scope) {
          var vm = this;
          vm.info = 'we not authorized';

          /**
          * @param {boolean} vm.user Initializing user data.
          * @param {boolean} vm.name Initializing user data.
          * @param {boolean} vm.surname Initializing user data.
          * @param {boolean} vm.authorized Initializing user data. 
          * @param {array} vm.arr_user.
          */

          vm.user_id = null;
          vm.name = false;
          vm.surname = false;
          vm.authorized = false;

          vm.arr_user = [];

          /**
          * @method correspondence
          * By clicking on the recipient's data.
          * @param {object} user - recipient data.
          */

          vm.correspondence = function(user){
               vm.arr_messages = [];
               vm.getid = chatFactory.getid(user);
               vm.arr_messages = msgFactory.messages(vm.getid);

               //перезаписываем данные отправителя
               vm.arr_user[0] = user;
          };

          vm.users = usersFactory.getUsers();

          /**
          * @method addUser
          * Adds a user.
          */

          vm.addUser = function(){
               usersFactory.addUser(vm.userName, vm.userSurname);
               vm.userName = '';
               vm.userSurname = '';
          };

          /**
          * @method enter
          * By clicking on the sample from the usersFactory.
          */

          vm.enter = function(){
               var user = usersFactory.enter(vm.userName, vm.userSurname);

               vm.user_id = user.user_id;
               vm.name = user.name;
               vm.surname = user.surname;
               vm.authorized = user.authorized;

               if(vm.authorized == true) vm.info = 'we authorized';
          }

          /**
          * @param {object} socket get object for communication via sockets.
          */

          var socket = window.io('localhost:3000/');
          vm.newMessage = undefined;
          vm.arr_messages = [];

          /**
          * @param {object} socket we send a message for testing.
          */

          socket.emit("test", "we are passing in a message");

          /**
          * @param {object} listen to the server response.
          */

          socket.on("receive-message", function(msg){

          /**
          * @param {object} after the arrival of the message, we update DOM.
          */

               $scope.$apply(function(){
                    console.log("received message");
                    vm.arr_messages.push(msg);
                  });

           });

          /**
          * @method sent
          * When you click on the send button, we will post the message and send it.
          */   

          vm.sent = function(){

               if(vm.authorized == false) {
               vm.info = 'you can not send msg';
               vm.msg = '';
               return;
               };

               var name = vm.arr_user[0].name;
               var surname = vm.arr_user[0].surname;
               var id = vm.arr_user[0].user_id;

               var friendData = 'Кому ' + name;
               var userData = ' От ' + vm.name;
               var result = friendData + userData + ' : ' + vm.msg;

               /**
               * @param {} msg_id We make a record in the factory.
               */

               var msg_id = msgFactory.add(result);

               /**
               * @param {} We record the sender and the recipient in chatFactory.
               */

               chatFactory.add(vm.user_id, msg_id);
               chatFactory.add(Number(id), msg_id);

               /**
               * @param {object} socket we send messages to the server.
               */
               
               socket.emit("new-message", result);
               vm.newMessage = undefined;
               vm.msg = '';

          };
     }
})(angular)