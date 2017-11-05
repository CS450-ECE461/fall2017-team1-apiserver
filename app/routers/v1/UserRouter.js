module.exports = exports = {
     '/user' : {
         get : { action : 'UserController@userDisplay'}
     },

    '/user/:id':{
        get: {action: 'UserController@getUser'},
        put: {action: 'UserController@updateUser'},

        '/dogs': {
            post: {action: 'UserController@addDog'}
        },

        '/dogs/:dogId': {
            get: {action: 'UserController@getDog'},
            put: {action: 'UserController@updateDog'},
        }
    }




};
