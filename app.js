var app = angular.module('flapperNews', ['ui.router']);

app.factory('posts', [function(){
  var obj = {
    posts: []
  };
  return obj;
}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.test = 'Hello world!';
    $scope.testing = 'Testing this injection stuff';

    $scope.posts = posts.posts;

    $scope.addPost = function(){
      if(!$scope.postTitle || $scope.title === '') { return; }
      $scope.posts.push({
          title: $scope.postTitle,
          link: $scope.link,
          upvotes: 0,
          comments: [
            {author:'Joe', body: 'Cool post!', upvotes: 0},
            {author: 'Bob', body: 'Great idea but everything is broken', upvotes: 0}
          ]
      });
      $scope.postTitle = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };

}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
      if($scope.body === '' ){ return; }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');

}]);
