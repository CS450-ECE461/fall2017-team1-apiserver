module.exports = exports = {
    '/avatarTest': {
      get: {view: 'ImageUploadTest.pug'},
      //get: {action: 'ImageController@getImageUrl'},
      post: {action: 'ImageController@uploadImage'}
    }
};
