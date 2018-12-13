var app = angular.module('ntask',
	[
		'ui.router',
		'ntask.register',
		'ntask.login',
		'ntask.agent',
		'ntask.customer',
		'common'
	]);
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('login', {
		url: "/",
		views : {
			"" : {
				templateUrl:"login/login.html"
			},
			"header@login":{
				templateUrl:"header/header.html"
			}
		}
	})
	.state('register', {
		url: "/register",
		views : {
			"" : {
				templateUrl:"register/register.html"
			},
			"header@register":{
				templateUrl:"header/header.html"
			}
		}
	})
	.state('agent', {
		url: "/agent",
		views : {
			"" : {
				templateUrl:"agent/agent.html"
			},
			"header@agent":{
				templateUrl:"header/header1.html"
			}
		}
	})
	.state('customer', {
		url: "/customer",
		views : {
			"" : {
				templateUrl:"customer/customer.html"
			},
			"header@customer":{
				templateUrl:"header/header1.html"
			}
		}
	})
})
.controller('mainCtrl',['$scope','$location','$rootScope', function($scope,$location,$rootScope){
	var local = JSON.parse(localStorage.getItem('userData'));
	$rootScope.local = local;
	$rootScope.Logout = function(){
		localStorage.clear();
		$location.path('/')
	}
}])
.run(function($rootScope,$location){
	var local = JSON.parse(localStorage.getItem('userData'));
	if(local){
		if(local.userType==="customer"){
			$location.path('/customer')
		} else if(local.userType==="agent") {
			$location.path('/agent')
		}
	}
})