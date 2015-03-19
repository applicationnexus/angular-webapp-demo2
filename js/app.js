/*global angular*/

"use strict";

var myApp = angular.module("myApp",[
	"appServices",
	"appControllers",
	"appFilters",
	"appDirectives",
	"ui.bootstrap"
]);

myApp.config(function($routeProvider){
	$routeProvider
		.when("/",
			{
				controller: "MainCtrl",
				templateUrl: "partials/main.html"
			})
		.when("/result/:place",
			{
				controller: "resultCtrl",
				templateUrl: "partials/result.html"
			})
		.otherwise({ redirectTo: "/" });
});