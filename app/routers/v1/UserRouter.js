module.exports = exports = {
    '/user/:id':{
        get: {action: 'UserController@getUser'},
        put: {action: 'UserController@updateUser'},

        '/dogs': {
            post: {action: 'UserController@addDog'}
        },

        '/dogs/:dogId': {
            get: {action: 'UserController@getDog'},
            put: {action: 'UserController@updateDog'}
        },

        '/status': {
            post: {action: 'UserController@updateStatus' }
        },

        '/criteria': {
            get: {action: 'MatchController@getCriteria'},
            put: {action: 'MatchController@updateCriteria'}
        },

        '/criteriaStatus': {
            put: {action: 'MatchController@updateStatus'}
        },

        '/findMatch': {
            post: {action: 'MatchController@findMatch'}
        },

        '/uploadImage': {
            get: {view: 'ImageUploadTest.pug'},
            post: {action: 'ImageController@uploadImage'}
        }
    }
};