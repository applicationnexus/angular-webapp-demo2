/*globals angular*/
"use strict";


var appControllers=angular.module( "appControllers", [ ] );


appControllers.controller( "resultCtrl", function( $scope, $routeParams, $location, googleMap, $http, $filter ) {
	 var lat, lng;
    navigator.geolocation.getCurrentPosition(function(position){
		lat=position.coords.latitude;
		lng=position.coords.longitude;
		console.log(lat+","+lng);
	});
 
  $scope.place = $routeParams.place;
  if(! $scope.place)
  {
	 $scope.place="atm"; 
	  $location.path("/MainCtrl");
  }
  console.log($scope.place);
  
  $scope.getUrl = function( placeurl ) {
    return "#/result"+ placeurl;
  };
  $scope.activeClass = function( place ) {
    return place.url.slice( 1 ).toLowerCase( ) === $scope.place ? "active" : "";
  };
  $scope.getLocation = function( details ) {
    var location = ( details && details.geometry && details.geometry.location ),
      out = [ ];
    if ( !location ) {
      return "location not available";
    } else {
      angular.forEach( location, function( value, key ) {
        this.push( $filter( "number" )( value, 4 ) );
      }, out );
      return out.join( ", " );
    }
  };
  if ( !$scope.place ) {
	 
  $location.path( $scope.getUrl( "/atm" ).slice( 1 ) );
  } else {
    setTimeout(function(){
		 
   googleMap.placeService.textSearch( {
        query: $scope.place,
        type: $scope.place,
        location: new googleMap._maps.LatLng( lat, lng ),
        radius: 50
      }, function( data ) {
        $scope.$apply( function( ) {
          $scope.data = data;
        } );
      } );
	  },1000);
  }
document.getElementById('header-back-btn').style.display="block";
} );
appControllers.controller( "ResultsTabCtrl", function( $scope, $routeParams, $location, googleMap, scrollToElem ) {
    $scope.tabs = {
      "map": false,
      "list": true
    };
    $scope.selectedMarker = 0;
    $scope.listView = function( ) {
      $scope.tabs = {
        "map": false,
        "list": true
      };
    };
    $scope.mapView = function( ) {
      $scope.tabs = {
        "map": true,
        "list": false
      };
    };
    $scope.$watch( function( ) {
      return googleMap.selectedMarkerIdx;
    }, function( newVal ) {
      var fn = function( ) {
        $scope.selectedMarker = newVal;
        if ( newVal !== null ) {
          $scope.listView( );
          scrollToElem.scrollTo( "listItem" + newVal );
        }
      };
      fn( );
    } );
  } );
  
  appControllers.controller( "MainCtrl", function( $scope, $routeParams, $location, $window,$http ) {
   $http.get( "data/places.json" ).success( function( results ) {
    $scope.places = results.data;
  } );
  document.getElementById('header-back-btn').style.display="none";
    $scope.$on( "$viewContentLoaded", function( event ) {
      $window.ga( "send", "pageview", {
        "page": $location.path( )
      } );
    } );
  } );
