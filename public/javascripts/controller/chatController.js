app.controller('chatController', ['$scope', ($scope) => {

    /*Angular variables*/
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.chatName = "";

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


    $scope.switchRoom = room => {
        $scope.chatName = room.roomName;
        $scope.chatClicked = true;
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
