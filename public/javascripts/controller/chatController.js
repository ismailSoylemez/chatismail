app.controller('chatController', ['$scope', 'chatFactory', ($scope , chatFactory) => {

    /*Angular variables*/
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.message =  "";
    $scope.roomId = "";
    $scope.messages = [];

    /*
    Socket event handling
     */


    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList',users => {
        console.log(users);
        $scope.onlineList = users;
        $scope.$apply();
    });

    //sunucudan (socketApi.js) den gelen odaları client
    //tarafında karşıladık
    socket.on('roomList' , rooms => {
        $scope.roomList = rooms;
        $scope.$apply();
    });

    //send butonuna basıldığında yapılacaklar
    //çekilen 2 data server a gönderilmeli
    $scope.newMessage = () => {
        console.log($scope.message);
        console.log($scope.roomId);
        socket.emit('newMessage', {
            //socketApide bunlar karşılanacak
           message: $scope.message,
           roomId: $scope.roomId,
        });
        $scope.message = '';
    };


    $scope.switchRoom = room => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;
        $scope.chatClicked = true;

        chatFactory.getMessages(room.id).then(data => {
            //console.log(data);
            $scope.messages[room.id] = data;
            console.log($scope.messages);
        });
    };



    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };


    //yeni oda oluşturuyoruz
    $scope.newRoom = () => {
      //let randomName = Math.random().toString(36).substring(7);
      //sunucuya emit yapacak
      //sunucu tarafında(socketApi) yakalayıp redise yollayacak
      //rediste oda açılacak

     let roomName = window.prompt("Enter room name");
     if(roomName !== '' && roomName !== null) {
         socket.emit('newRoom' ,roomName);
        }


      //socket.emit('newRoom',randomName);
    };




}]);
