module.exports = exports = {
    '/reg':{
        post : {action: 'RegController@createUser'}
    },
    '/reg/confirm':{
        post : {action: 'RegController@confirmUser'}
    }
};
