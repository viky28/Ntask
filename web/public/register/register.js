angular.module('ntask.register',[])
.controller('registerCtrl',['$scope','postService','$location','$timeout', function($scope,postService,$location,$timeout){
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
			if(data.data.status==="error"){
				$scope.errorMsg = "Already Registered !"
				$timeout(function(){
					$scope.errorMsg = ""
				},2000)
			} else {
				$scope.user = {};
				$location.path('/')
			}
			
		},function(data,status,header,config){
			console.log("error",data)
			$scope.errorMsg = "Sorry We Are Facing Some Server Issue !"
				$timeout(function(){
					$scope.errorMsg = ""
				},2000)
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