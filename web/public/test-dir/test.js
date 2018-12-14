var app = angular.module('ntask.test',[])
app.controller('testCtrl',['$scope', function($scope){
	$scope.data = {
	   headList: [{ name: 'Company' }, { name: 'Address' }, { name: 'City' },{name:"Email"}],
	   rowList: [{
                  "username":"Vikrant",
                  "age":"28",
                  "address":"Marathahalli",
                  "email":"viky@gmail.com"
                },
                {
                  "username":"Riya",
                  "age":"25",
                  "address":"Kolkata",
                  "email":"riya@gmail.com"
                },
                {
                  "username":"Anki",
                  "age":"24",
                  "address":"Marathahalli",
                  "email":"anki@gmail.com"
                }]
	}
}])
var tabledirective = function(){
    return {
       restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            data: '='         
            },
            templateUrl: 'test-dir/template.html',
            link:function(scope,element,attribute){
            	scope.testDirective = "Testing Directive";
            	scope.getRow = function(row){
            		console.log("row data is ", row)
            		var data = JSON.stringify(row);
            		alert(data)
            	}
            }
        }
}
app.directive('tableDirective',tabledirective);
