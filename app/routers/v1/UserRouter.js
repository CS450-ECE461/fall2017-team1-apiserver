module.exports = exports = {
    '/user/:id':{
        get: {action: 'UserController@getUser'},
        put: {action: 'UserController@updateUser'}
    }


};
