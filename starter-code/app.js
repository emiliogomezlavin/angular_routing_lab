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
app.controller('WinesIndexCtrl',function($scope, $http){

    $http.get('http://daretoexplore.herokuapp.com/wines/')
        .then(function(response) {
            $scope.wines = response.data;
        });
  // $scope.wines = WineService.query(); 
});

app.controller('WinesShowCtrl',function($scope, $http, $routeParams){
    $http.get('http://daretoexplore.herokuapp.com/wines/' + $routeParams.id)
        .then(function(response) {
            // console.log(response.data)
            $scope.wine = response.data;
        });
  // $scope.wine = WineService.get($routeParams.id);
});

////////////
// MODELS //
////////////

app.factory('WineService', function(){

  var WineService = {};

  WineService.query = function(){
    return ALL_WINES;
  };

  WineService.get = function(id){
    var id = parseInt(id);
    return ALL_WINES.find(function(wine){
      return wine.id == id;
    });
  };

  return WineService;

});

