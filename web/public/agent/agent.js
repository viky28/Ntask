angular.module('ntask.agent',[])
.controller('agentCtrl',['$scope','postService', function($scope,postService){
	var local = JSON.parse(localStorage.getItem('userData'));
	$scope.userType = local.userType;
	var data = {
		cmd:'getcomplaintsFullList'
	}

	postService.getPromise(data)
	.then(function(data,status,config,header){
		console.log("success",data)
		if(data.data.status==="error"){
			$scope.errorMsg = "No Data Found !"
		} else {
			var temp = []
			var result = data.data.result;
			for(var i=0;i<result.length;i++){
				for(var j=0;j<result[i].complaintData.length;j++){
					var temp1 = {email:result[i].email,status:result[i].complaintData[j].status,create_date:result[i].complaintData[j].create_date,update_date:result[i].complaintData[j].update_date,heading:result[i].complaintData[j].heading,desc:result[i].complaintData[j].desc,cid:result[i].complaintData[j].cid}
					temp.push(temp1);
				}
			}
			$scope.tableData = temp;
		}
	},function(data,status,config,header){
		console.log("error",data)
	})

	$scope.openModal = function(data,flag){
		console.log(data)
		$('#myModal').modal('show');
		$scope.modalData = data;
	}
	$scope.updateStatus = function(){
		var data = {
			cmd:"updatecomplaintstatus",
			params:{
				email:$scope.modalData.email,
				status:$scope.modalData.status,
				cid:$scope.modalData.cid
			}
		}
		postService.getPromise(data)
		.then(function(data,status,config,header){
			console.log("success",data)
		},function(data,status,config,header){
			console.log("error",data)
		})
	}
}])