angular.module('ntask.customer',[])
.controller('custCtrl',['$scope','postService', function($scope,postService){
	var local = JSON.parse(localStorage.getItem('userData'));
	$scope.userType = local.userType;
	var data = {
		cmd:'getcomplaintsPerUser',
		params:{
			email:local.email
		}
	}

	postService.getPromise(data)
	.then(function(data,status,config,header){
		console.log("success",data)
		if(data.data.status==="error"){
			$scope.errorMsg = "No Data Found !"
			$scope.tableData = [];
		} else {
			$scope.tableData = data.data.result.complaintData;
		}
	},function(data,status,config,header){
		console.log("error",data)
	})

	$scope.createComplaint = function(){
		if($scope.flag==='rowClick'){
			let data = {
				cmd:"updatecomplaintbycustomer",
				params:{
					email:JSON.parse(localStorage.getItem('userData')).email,
					cid:$scope.cid,
					heading:$scope.heading,
					desc:$scope.desc
				}
			}
			console.log("edit send",data)
			postService.getPromise(data)
			.then(function(data,status,config,header){
				console.log('success',data)
				$scope.tableData = data.data.result.complaintData;
				$scope.showForm = false;
				$scope.heading = "";
				$scope.desc = "";
			},function(data,status,config,header){
				console.log('error',data)
			})
		} else {
			let data = {
				cmd:"createcomplaint",
				params:{
					heading:$scope.heading,
					desc:$scope.desc,
					email:JSON.parse(localStorage.getItem('userData')).email
				}
			}
			console.log("data send==",data)
			postService.getPromise(data)
			.then(function(data,status,config,header){
				console.log('success',data)
				$scope.tableData.push(data.data.data);
				console.log("table data",$scope.tableData)
				$scope.showForm = false;
				$scope.heading = "";
				$scope.desc = "";
			},function(data,status,config,header){
				console.log('error',data)
			})
		}
		
	}
	$scope.ToggleForm  = function(){
		$scope.showForm= !$scope.showForm;
		$scope.heading = "";
		$scope.desc = "";
	}

	$scope.openForm = function(data,flag){
		$scope.heading = data.heading;
		$scope.desc = data.desc;
		$scope.cid = data.cid;
		$scope.showForm = true;
		$scope.flag = 'rowClick';
	}
}])