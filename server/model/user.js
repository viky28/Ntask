var config  = require("../config.json");
var Sequence = require('sequence').Sequence;
var _ = require('underscore');
var database = require("./database");
var ObjectId = require('mongodb').ObjectID;


exports.register = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		p.saveTime = new Date();
		db.user.save(p, function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})
}
exports.login = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		db.user.findOne(p, function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})
}

exports.createcomplaint = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		db.complaint.findOne({email:p.email}, function(er,re){
			if(er || !re){
				next(null)
			} else {
				next(re._id)
			}
		})
	})
	.then(function(next,id){
		var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		console.log("id1",id)
		p.create_date = new Date();
		if(!id && id==null){
			var saveData = {email:p.email,complaintData:[{cid:hash ,status:"pending",heading:p.heading,desc:p.desc,create_date:p.create_date,update_date:""}]}
			db.complaint.save(saveData, function(er1,re1){
				if(er1 || !re1){
					cb("ERROR",null)
				} else {
					cb(er1,re1)
				}
			})
		} else {
			console.log("in else")
			var complaintData = {cid:hash,status:'pending',heading:p.heading,desc:p.desc,create_date:p.create_date,update_date:""};
			db.complaint.update({email:p.email},{$addToSet:{complaintData:complaintData}},{new:true}, function(er2,re2){
				if(er2 || !re2){
					cb("ERROR",null)
				} else {
					console.log("re2",re2.opts)
					cb(er2,re2,complaintData)
				}
			})
		}
	})
}
exports.getcomplaintsPerUser = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		db.complaint.findOne(p, function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})
}
exports.getcomplaintsFullList = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		db.complaint.find().toArray(function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})
}
exports.updatecomplaintstatus = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		var cid = p.cid;
		console.log("p.cid",cid)
		db.complaint.updateOne({email:p.email,"complaintData.cid":cid},{$set:{"complaintData.$.status":p.status}},function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})
}
exports.updatecomplaintbycustomer = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	.then(function(next){
		var cid = p.cid;
		console.log("p.cid",cid)
		db.complaint.updateOne({email:p.email,"complaintData.cid":cid},{$set:{"complaintData.$.heading":p.heading,"complaintData.$.desc":p.desc,"complaintData.$.update_date":new Date()}},function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				next();
			}
		})
	})
	.then(function(next){
		db.complaint.findOne({email:p.email},function(er1,re1){
			if(er1 || !re1){
				cb("ERROR",null)
			} else {
				cb(er1,re1)
			}
		})
	})
}
// exports.saveData = function(p,cb){
// 	var db;
// 	var seq = Sequence.create();
// 	seq
// 	.then(function(next){
// 		database.getdb(function(err,dbref){
// 			if(err){
// 				console.log("ERROR", "unable to connect to DB");
// 				process.exit(1);
// 			} else {
// 				db=dbref;
// 				next();
// 			}
// 		})
// 	})
// 	.then(function(next){
// 		p.saveTime = new Date();
// 		db.number.save(p, function(er,re){
// 			if(er || !re){
// 				cb("ERROR",null)
// 			} else {
// 				cb(er,re)
// 			}
// 		})
// 	})

// }
// exports.getData = function(p,cb){
// 	var db;
// 	var seq = Sequence.create();
// 	seq
// 	.then(function(next){
// 		database.getdb(function(err,dbref){
// 			if(err){
// 				console.log("ERROR", "unable to connect to DB");
// 				process.exit(1);
// 			} else {
// 				db=dbref;
// 				next();
// 			}
// 		})
// 	})
// 	.then(function(next){
// 		db.number.find({}).sort({_id:-1}).limit(1).toArray(function(er,re){
// 			if(er || !re){
// 				cb("ERROR",null)
// 			} else {
// 				cb(er,re)
// 			}
// 		})
// 	})

// }

