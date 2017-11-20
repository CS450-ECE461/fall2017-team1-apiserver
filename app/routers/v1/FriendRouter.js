module.exports = exports = {
    '/friend/:id': {
        get: {action: 'FriendController@getFriends'},
        post: {action: 'FriendController@createFriend'},
    }
};