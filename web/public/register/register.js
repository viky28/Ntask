angular.module('ntask.register',[])
.controller('registerCtrl',['$scope','postService','$location', function($scope,postService,$location){
	$scope.registerCustomer = function(){
		console.log("user detail",$scope.user)
		$scope.user.userType = "customer";
		var data = {
			cmd:"register",
			params:$scope.user
		}
		postService.getPromise(data)
		.then(function(data,status,config,header){
			console.log("success",data)
			$scope.user = {};
			$location.path('/')
		},function(data,status,header,config){
			console.log("error",data)
		})
	}
}])
.service('postService', function($http,Config){
	this.getPromise = function(data){
		var header = Config.headers;
		var host = Config.baseURL;
		return $http.post(host,data,header);
	}
})