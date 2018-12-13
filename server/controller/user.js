var config  = require("../config.json");
var user = require("../model/user");
var router={};
router.register = function(req, res) {

	var ip = req.body.params;
	if(!ip.email || !ip.mobile || !ip.password || !ip.userType){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.register(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}
router.login = function(req, res) {

	var ip = req.body.params;
	if(!ip.email || !ip.password){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.login(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: {userType:cbresult.userType}}));
		}
	})
}
router.createcomplaint = function(req, res) {

	var ip = req.body.params;
	if(!ip.email ||  !ip.heading || !ip.desc){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.createcomplaint(ip, function(err,cbresult,data){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult,data:data}));
		}
	})
}
router.getcomplaintsPerUser = function(req, res) {

	var ip = req.body.params;
	if(!ip.email){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.getcomplaintsPerUser(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}
router.getcomplaintsFullList = function(req, res) {

	var ip = req.body;
	if(!ip){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.getcomplaintsFullList(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}
router.updatecomplaintstatus = function(req, res) {

	var ip = req.body.params;
	if(!ip.email || !ip.cid || !ip.status){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.updatecomplaintstatus(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}
router.updatecomplaintbycustomer = function(req, res) {

	var ip = req.body.params;
	if(!ip.email || !ip.cid || !ip.heading || !ip.desc){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.updatecomplaintbycustomer(ip, function(err,cbresult,data){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}
// router.saveData = function(req, res) {

// 	var ip = req.body.params;
// 	if(!ip.firstNum || !ip.secondNum || !ip.multiple){
// 		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
// 		return;
// 	}
// 	number.saveData(ip, function(err,cbresult){
// 		if(err){
// 			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
// 		} else {
// 			res.send(JSON.stringify({status:"success", result: cbresult}));
// 		}
// 	})
// }

// router.getData = function(req, res) {

// 	var ip = req.body;
// 	if(!ip){
// 		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
// 		return;
// 	}
// 	number.getData(ip, function(err,cbresult){
// 		if(err){
// 			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
// 		} else {
// 			res.send(JSON.stringify({status:"success", result: cbresult}));
// 		}
// 	})
// }

module.exports = router
