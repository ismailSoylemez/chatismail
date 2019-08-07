app.factory('chatFactory', ['$http',($http) => {

    //tıkladığımda ilgili verilere
    // messages/list den erişmek istiyorum


    const getMessages = roomId => {
        return $http({
            url: 'http://localhost:3000/messages/list',
            method: 'GET',
            params: {
                roomId
            },
        }).then(response => {
            return response.data;
        }, (err) => {
            console.log(err);
        })
    };
    return {
        getMessages
    }
}]);