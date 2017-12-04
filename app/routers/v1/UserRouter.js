module.exports = exports = {
    '/user/:id':{
        get: {action: 'UserController@getUser'},
        put: {action: 'UserController@updateUser'},

        '/dogs': {
            post: {action: 'UserController@addDog'}
        },

        '/dogs/:dogId': {
            get: {action: 'UserController@getDog'},
            put: {action: 'UserController@updateDog'},
        },

        '/status': {
            put: {action: 'MatchController@updateStatus'}
        },
        '/criteria': {
            get: {action: 'MatchController@getCriteria'},
            put: {action: 'MatchController@updateCriteria'}
        },
        '/uploadImage': {
            post: {action: 'ImageController@uploadImage'}
        }
    }
};
