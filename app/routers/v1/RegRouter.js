module.exports = exports = {
    '/reg':{
        post : {action: 'RegController@createUser'}
    },
    '/reg/confirm/:emailID':{
        post : {action: 'RegController@confirmUser'}
    }
};
