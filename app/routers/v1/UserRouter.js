module.exports = exports = {
     '/user' : {
         get : { action : 'UserController@userDisplay'}
     },

    '/user/:id':{
        get: {action: 'UserController@getUser'},
        put: {action: 'UserController@updateUser'}
    }


};
