module.exports = exports = {
  '/user/:id':{
    '/avatar': {
      get: {action: 'ImageController@getImageUrl'},
      post: {action: 'ImageController@uploadImage'}
    },
  '/dogs/:dogId/dogAvatar': {
      get: {action: 'ImageController@getDogImageUrl'},
      post: {action: 'ImageController@uploadDogImage'}
    }
  }
};
