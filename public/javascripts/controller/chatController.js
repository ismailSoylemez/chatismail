app.controller('chatController', ['$scope', ($scope) => {

    $scope.onlineList = [];
    $scope.activeTab = 2;


    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList',users => {
        console.log(users);
        $scope.onlineList = users;
        $scope.$apply();
    });



    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };

    $scope.newRoom = () => {
      let randomName = Math.random().toString(36).substring(7);
      //sunucuya emit yapacak
      //sunucu tarafında(socketApi) yakalayıp redise yollayacak
      //rediste oda açılacak
      socket.emit('newRoom',randomName);


    };




}]);
