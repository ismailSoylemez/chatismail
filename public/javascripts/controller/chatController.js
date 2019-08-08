app.controller('chatController', ['$scope', 'chatFactory', 'userFactory' , ($scope , chatFactory ,userFactory) => {


    /*
    *  initialization
    */

    //hangi kullanıcı giriş yaparsa onun verisine de ulaşabilirim
    function init () {
        userFactory.getUser().then(user => {
            $scope.user = user;
        })
    }

    init();


    /*Angular variables*/
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 2;
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.chatName = "";
    $scope.message =  "";
    $scope.roomId = "";
    $scope.messages = [];

    $scope.user = { };

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

        if($scope.message.trim() !== '') {
            //console.log($scope.message);
            //console.log($scope.roomId);
            socket.emit('newMessage', {
                //socketApide bunlar karşılanacak
                message: $scope.message,
                roomId: $scope.roomId,
            });


            $scope.messages[$scope.roomId].push({
                userId: $scope.user._id,
                username: $scope.user.name,
                surname: $scope.user.surname,
                message: $scope.message
            });



            $scope.message = '';
        }

        console.log($scope.user);
    };


    $scope.switchRoom = room => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;
        $scope.chatClicked = true;

        //odaya her tıkladığımda mesajlar için backende her defasında
        //istek atmasın diye
        //yani odaya 1 kez tıkladığında mesajları çekecek ve
        //tekrar tıkladığında bir kez daha çekmesine gerek kalmayacak
        if (!$scope.messages.hasOwnProperty(room.id)) {
            $scope.loadingMessages = true;

            console.log('servise bağlanıyor');

            chatFactory.getMessages(room.id).then(data => {
                //console.log(data);
                $scope.messages[room.id] = data;
                //console.log($scope.messages);
                $scope.loadingMessages = false;
            });
        }


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
