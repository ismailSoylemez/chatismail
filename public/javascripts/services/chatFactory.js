app.factory('chatFactory', ['$http', 'env' ,($http , env) => {

    //tıkladığımda ilgili verilere
    // messages/list den erişmek istiyorum


    const getMessages = roomId => {
        return $http({
            url: env.SERVICE_URL + 'messages/list',
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