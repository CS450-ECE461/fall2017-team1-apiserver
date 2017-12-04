module.exports = exports = {
    '/messages/:id': {
        get: {action: 'MessageController@getConversation'},
        post: {action: 'MessageController@createMessage'},
    }
};