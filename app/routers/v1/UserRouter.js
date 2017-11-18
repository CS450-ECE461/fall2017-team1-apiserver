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
            post: {action: 'UserController@updateStatus' }
        },
        '/criteria': {
            put: {action: 'MatchController@updateStatus'}
        }
    }
};