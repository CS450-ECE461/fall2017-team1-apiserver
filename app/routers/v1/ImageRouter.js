module.exports = exports = {
  '/user/:id':{
    '/uploadImage': {
      get: {action: 'ImageController@getImageUrl'},
      post: {action: 'ImageController@uploadImage'}
    }
  },
  '/dogs/:dogId': {
    '/uploadDogImage': {
      get: {action: 'ImageController@getDogImageUrl'},
      post: {action: 'ImageController@uploadDogImage'}
    }
  }
};
