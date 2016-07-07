var app = angular.module('wineApp', ['ngRoute']);

console.log('Angular is working.');

////////////
// ROUTES //
////////////

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: "templates/wines-index.html",
            controller: "WinesIndexCtrl"
        })
        .when('/wines/:id', {
            templateUrl: "templates/wines-show.html",
            controller: "WinesShowCtrl" 
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false         
        });
});


/////////////////
// CONTROLLERS //
/////////////////
app.controller('WinesIndexCtrl',function($scope, WineService){ 
    $scope.wines = WineService.query(); 
    console.log($scope.wines);
});

app.controller('WinesShowCtrl',function($scope, WineService, $routeParams){
    $scope.wine = WineService.get($routeParams.id);
});

////////////
// MODELS //
////////////


/// This solution doesn't fully work. The function needs to be called as an object
//   with a key of the function that calls the actual http request. You could look
//   into Michael's solution. For easier understanding look into last commit with 
//   the ajax calls from the controller

app.factory('WineService', function($http){

  var WineService = {};
  WineService.$inject = ['$http', '$scope'];

  WineService.query = function(){
    console.log("I get called before the http request");
    $http.get('http://daretoexplore.herokuapp.com/wines/')
        .then(function(response) {
            console.log("I get called when success from the request", response.data)
            return response.data;
        });
  };

  WineService.get = function(id){
    var id = parseInt(id);
    console.log(id);
    $http.get('http://daretoexplore.herokuapp.com/wines/' + id)
        .then(function(response) {
            return response.data;
        });
  };

  return WineService;

});

