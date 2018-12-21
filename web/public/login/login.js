angular.module('ntask.login',['ngMessages'])
.controller('loginCtrl',['$scope','postService','$location','$timeout', function($scope,postService,$location,$timeout){
	
	
	$scope.doLogin = function(){
		var data = {
			cmd:"login",
			params:$scope.user
		}
		postService.getPromise(data)
		.then(function(data,status,config,header){
			console.log("sucess",data)
			if(data.data.status==="error"){
				$scope.errorMSG = "wrong Credentials !"
				$timeout(function(){
					$scope.errorMSG = "";
				},2000)
			} else {
				$scope.user.userType = data.data.result.userType;
				$scope.user = $scope.user;
				localStorage.setItem('userData',JSON.stringify($scope.user));
				if($scope.user.userType==="customer"){
					$location.path('/customer')
				} else if($scope.user.userType==="agent") {
					$location.path('/agent')
				}
			}	
		},function(data,status,config,header){
			console.log("error",data)
			$scope.errorMSG = "Sorry We Are Facing Some Server Issue !";
			$timeout(function(){
					$scope.errorMSG = "";
				},2000)
		})
	}
}])
.run(function($location,$rootScope){
	var local = JSON.parse(localStorage.getItem('userData'));
	console.log("in local run block")
	if(local){
		if(local.userType==="customer"){
			$location.path('/customer')
		} else if(local.userType==="agent") {
			$location.path('/agent')
		}
	}
	$rootScope.logout;
})