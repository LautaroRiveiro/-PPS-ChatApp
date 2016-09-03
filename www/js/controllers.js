angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };







    var refUsers = new Firebase("https://chatapp-4d07a.firebaseio.com/chats");
    $scope.chats = [];

    refUsers.on('child_added', function(snapshot){
        // $timeout(function(){
        var chat = snapshot.val();
        var d = new Date(chat.timestamp);
        chat.hora = d.getHours()+":"+d.getMinutes();
        chat.id = snapshot.key();
        $scope.chats.push(chat);
        console.log($scope.chats);
        // }
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);





    var refMensajes = new Firebase("https://chatapp-4d07a.firebaseio.com/mensajes");
    refMensajes.on('child_added', function(snapshot){
       
        if(snapshot.key() == $stateParams.chatId){
            $scope.mensajes = [];

            var refMensajesDelChat = refMensajes.child($stateParams.chatId);
            refMensajesDelChat.on('child_added', function(snapshot){
                var mensaje = snapshot.val();

                var idUsuarioEmisor = mensaje.emisor;
                //var nombreUsuarioEmisorref = new Firebase("https://chatapp-4d07a.firebaseio.com/mensajes");;

                var d = new Date(mensaje.timestamp);
                mensaje.hora = d.getHours()+":"+d.getMinutes();

//BAHHHH COMO SE RECUPERA EL NOMBREEEEEE!!!

                refMensajesDelChat.root().child('usuarios/'+idUsuarioEmisor+'/nombre')
                    .once("value", function(snapshot) {
                        var data = snapshot.val();
                        //alert(data);
                        return data;
                    });
                
                $scope.mensajes.push(mensaje);
            });
        };



        // $timeout(function(){
        // var chat = snapshot.val();
        // var d = new Date(chat.timestamp);
        // chat.hora = d.getHours()+":"+d.getMinutes();
        // $scope.mensajes.push(chat);
        // console.log($scope.mensajes);
        // }
    });



})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
