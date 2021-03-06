const mysql = require("mysql");
// const VeXe = require('../modelsAdmin/chitietvexeModels');

//MySql config
const mysqlDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "final_booking_system",
});

mysqlDB.connect(function (err) {
	if (err) return console.log(err.message);
	//   console.log("Mysql connected...")
});

module.exports = {
	// THÍCH THÌ DÙNG KHÔNG THÍCH THÌ THÔI

	findPostIdByName: function (src, des, callback) {
		let query = "select * from tuyenxe where DiemDi = ? and DiemDen=?";
		let bind = [];
		bind.push(src);
		bind.push(des);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},
	findPost: function (trip, date, callback) {
		let query =
			"select * from chuyenxe where chuyenxe.MaTX = ? and chuyenxe.NgayDi=?";
		let bind = [];
		bind.push(trip);
		bind.push(date);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},
	findTrip: function (callback) {
		let query = "select * from tuyenxe";
		mysqlDB.query(query, (err, result) => {
			if (err) throw err;
			callback(result);
		});
	},
	findByEmail: function (email, callback) {
		let query = "select * from users where email = ?";
		mysqlDB.query(query, email);
	},
	// addOne: function (val1, val2, val3, callback) {
	// 	let bind = [];
	// 	bind.push(val1);
	// 	bind.push(val2);
	// 	bind.push(val3);
	// 	let query =
	// 		"INSERT INTO `xe`(`BienSoXe`, `LoaiXe`, `SoChoNgoi`, `MaBX`) VALUES (?,?,30,?)";
	// 	mysqlDB.query(query, bind, (err, result) => {
	// 		if (err) return callback({ isAdded: false });
	// 		callback({ isAdded: true });
	// 	});
	// },

	addOne: function (val1, val2, val3, callback) {
		console.log(val1, val2, val3);
		let bind = [];
		bind.push(val1);
		bind.push(val2);
		bind.push(val3);
		let query =
			"INSERT INTO `xe`(`BienSoXe`, `LoaiXe`, `SoLuongGhe`) VALUES (?,?,?)";
		mysqlDB.query(query, bind, (err, result) => {
			if (err) {
				console.log(err);
				return callback({ isAdded: false });
			}
			callback({ isAdded: true });
		});
	},

	updateBus: function (val1, val2, val3, callback) {
		console.log(val1, typeof val2);
		let bind = [];
		bind.push(val1);
		bind.push(val2);
		bind.push(val3);
		let query = "UPDATE  xe set LoaiXe = ?, SoLuongGhe = ? where BienSoXe = ?";
		mysqlDB.query(query, bind, (err, result) => {
			if (err) {
				console.log(err);
				return callback({ isAdded: false });
			}
			callback({ isAdded: true });
		});
	},

	addTrip: function (val1, val2, val3, val4, callback) {
		console.log(val1, val2, val3, val4);
		let bind = [];
		bind.push(val1);
		bind.push(val2);
		bind.push(val3);
		bind.push(val4);
		let query =
			"INSERT INTO `tuyenxe`(`MaTX`, `DiemDi`, `DiemDen`, `DonGia`) VALUES (?,?,?,?)";
		mysqlDB.query(query, bind, (err, result) => {
			if (err) {
				console.log(err);
				return callback({ isAdded: false });
			}
			callback({ isAdded: true });
		});
	},

	updateTrip: function (val1, val2, val3, val4, callback) {
		console.log(val1, val2, val3, val4);
		let bind = [];
		bind.push(val1);
		bind.push(val2);
		bind.push(val3);
		bind.push(val4);
		let query =
			"update `tuyenxe` set `DiemDi` = ?, `DiemDen` = ?, `DonGia` = ? where `MaTX` = ?";
		mysqlDB.query(query, bind, (err, result) => {
			if (err) {
				console.log(err);
				return callback({ isAdded: false });
			}
			callback({ isAdded: true });
		});
	},

	addPost: function (val1, val2, val3, val4, val5, callback) {
		console.log(val1, val2, val3, val4, val5);
		let bind = [];
		bind.push(val1);
		bind.push(val2);
		bind.push(val3);
		bind.push(val4);
		bind.push(val5);
		let query =
			"INSERT INTO `chuyenxe`(`MaCX`, `MaTX`, `BienSoXe`, `NgayDi`, `GioDi`) VALUES (?,?,?,?,?)";
		mysqlDB.query(query, bind, (err, result) => {
			if (err) {
				console.log(err);
				return callback({ isAdded: false });
			}
			callback({ isAdded: true });
		});
	},

	updatePost: function (val1, val2, val3, val4, val5, callback) {
		console.log(val1, val2, val3, val4, val5);
		let bind = [];
		bind.push(val1);
		bind.push(val2);
		bind.push(val3);
		bind.push(val4);
		bind.push(val5);
		let query =
			"update `chuyenxe` set `MaTX` = ?, `BienSoXe` = ?, `NgayDi` = ?, `GioDi` = ? where `MaCX` = ?";
		mysqlDB.query(query, bind, (err, result) => {
			if (err) {
				console.log(err);
				return callback({ isAdded: false });
			}
			callback({ isAdded: true });
		});
	},

	getAllTicket: function (callback) {
		let query = "select * from vexe ";
		mysqlDB.query(query, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},

	getPostByDateTime: function (trip, date, time, callback) {
		let query =
			"select * from vexe where vexe.MaCX = (select chuyenxe.MaCX from chuyenxe where chuyenxe.MaTX =? and chuyenxe.NgayDi=? and chuyenxe.GioDi=?)";
		let bind = [];
		bind.push(trip);
		bind.push(date);
		bind.push(time);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},
	getAllPostsOfTrip: function (callback) {
		let query = "select * from chuyenxe ";
		mysqlDB.query(query, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},

	getAllBuses: function (callback) {
		let query = "select * from xe ";
		mysqlDB.query(query, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},
	getPostsOfTripByDate: function (trip, date, callback) {
		let query =
			"select * from chuyenxe where chuyenxe.MaCX = chuyenxe.MaCX and  chuyenxe.MaTX =? and chuyenxe.NgayDi=?";
		let bind = [];
		bind.push(trip);
		bind.push(date);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},
	getAllTrips: function (callback) {
		let query = "select * from tuyenxe";
		mysqlDB.query(query, (err, result) => {
			if (err) throw err;
			callback(result);
		});
	},
	getInfoTrip: function (tripId, callback) {
		let query = "select * from tuyenxe where MaTX=?";
		mysqlDB.query(query, tripId, (err, result) => {
			if (err) return console.log("a mistake -1");
			callback(result);
		});
	},
	getInfoUser: function (email, callback) {
		let query = "select * from khachhang where Email = ?";
		mysqlDB.query(query, email, (err, result) => {
			if (err) throw err;
			callback(result);
		});
	},
	getInfoPost: function (postID, callback) {
		let query = "select * from chuyenxe where MaCX=?";
		mysqlDB.query(query, postID, (err, result) => {
			let not = false;
			if (err) return callback(not);
			callback(result);
		});
	},
	save: function (bind, callback) {
		let query =
			"INSERT INTO `khachhang`(`Email`, `TenKH`, `SDT`, `GioiTinh`, `DiaChi`) VALUES (?,?,?,?,?)";
		let not = false;
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return callback(not);
			callback(result);
		});
	},
	getSeatsBooked: function (postID, callback) {
		let query = "select SoGhe from vexe where MaCX=?";
		let bind = [];
		bind.push(postID);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log("a mistake 1");
			callback(result);
		});
	},
	checkSeatBySeat: function (seat, postID, callback) {
		let query = "select SoGhe from chitietvexe where MaCX=? and SoGhe = ?";
		let bind = [];
		bind.push(postID);
		bind.push(seat);

		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log("a mistake 2");
			callback(result);
		});
	},
	saveBillTicket: function (bind, callback) {
		let query =
			"insert into `hoadon`(`MaVeXe`,`Email`,`NgayDat`) values (?,?,?)";
		let not = false;
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return callback(err);
			callback(result);
		});
	},
	saveTicket: function (bind, callback) {
		let query = "insert into `vexe`(`MaVeXe`,`MaCX`,`SoGhe`) values (?,?,?)";
		let not = false;
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log(not);
			callback(result);
		});
	},
	updateTickets: function (tickets, postID, callback) {
		let query =
			"update `chuyenxe` set `SoVeHienCon` =(select `SoVeHienCon` from `chuyenxe` where `MaCX`=?) - ? where MaCX=?";
		let bind = [];
		bind.push(postID);
		bind.push(tickets);
		bind.push(postID);
		let not = false;
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log("lôi day ne");
			callback(result);
		});
	},
	getAllCusId: function (callback) {
		let query = "select `CMND` from `khachhang`";
		mysqlDB.query(query, (err, result) => {
			if (err) return console.log("a mistake");
			callback(result);
			//console.log(result)
		});
	},
	findCusByEmail: function (email, callback) {
		try {
			let query = "select * from `khachhang` where Email=?";
			let notdone = false;
			mysqlDB.query(query, email, (err, result) => {
				if (err) return callback(notdone);
				callback(result);
			});
		} catch (error) {
			console.log(error);
		}
	},
	reviewTicket: function (id, callback) {
		let query = "select * from `khachhang` where Email=?";
		let notdone = false;
		mysqlDB.query(query, email, (err, result) => {
			if (err) return callback(notdone);
			callback(result);
		});
	},
	checkTicket: function (ticketId, callback) {
		let query = `select * from chuyenxe 
	 INNER JOIN vexe ON vexe.MaCX = chuyenxe.MaCX 
	 INNER JOIN hoadon ON vexe.MaVeXe = hoadon.MaVeXe WHERE vexe.MaVeXe = ?`;
		mysqlDB.query(query, ticketId, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	getAllTicketsById: function (cmnd, callback) {
		let query =
			"select * from `chitietvexe`,`vexe`,`chuyenxe` where chitietvexe.MaVeXe = vexe.MaVeXe and chitietvexe.MaCX = chuyenxe.MaCX and vexe.CMND = ?";
		mysqlDB.query(query, cmnd, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	getAllTicketsByEmail: function (email, callback) {
		let query =
			"select * from `vexe`,`hoadon`,`chuyenxe` where vexe.MaVeXe = hoadon.MaVeXe and vexe.MaCX = chuyenxe.MaCX and hoadon.Email = ?";
		mysqlDB.query(query, email, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	getAllTickets: function (pid, callback) {
		let query = `select * from vexe,hoadon,chuyenxe where vexe.MaVeXe = hoadon.MaVeXe and vexe.MaCX = chuyenxe.MaCX ${
			pid ? "and vexe.MaCX= ?" : "and 1=?"
		}`;
		mysqlDB.query(query, pid ? pid : 1, (err, result) => {
			if (err) return callback(err);
			callback(result);
		});
	},
	findUserByEmail: function (email, callback) {
		let query = "select Email from khachhang where Email=? limit 1";
		mysqlDB.query(query, email, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	checkCusByEmail: function (email, callback) {
		let query = "select Email from khachhang where Email=?";
		mysqlDB.query(query, email, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	destroyTicket: function (id, callback) {
		let query = "delete from vexe where vexe.MaVeXe = ?";
		mysqlDB.query(query, id, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	updateCus: function (email, cus, callback) {
		let query =
			"update `khachhang` set  `SDT`= ?, `DiaChi`= ? where `Email` =?";
		let bind = [];
		bind.push(cus.SDT);
		bind.push(cus.DiaChi);
		bind.push(email);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	getPostDetailed: function (postID, callback) {
		// let query =`SELECT chuyenxe.MaTX, chuyenxe.MaCX,chuyenxe.BienSoXe,benxe.TenBX,tuyenxe.DonGia
		// FROM chuyenxe
		// INNER JOIN benxe ON chuyenxe.MaBXDi =  benxe.MaBX
		// INNER JOIN tuyenxe ON tuyenxe.MaTX= chuyenxe.MaTX where chuyenxe.MaCX = ?`
		let query = `SELECT *
	FROM chuyenxe
	INNER JOIN tuyenxe ON chuyenxe.MaTX =  tuyenxe.MaTX
	INNER JOIN xe ON chuyenxe.BienSoXe = xe.BienSoXe where chuyenxe.MaCX = ?`;
		mysqlDB.query(query, postID, (err, result) => {
			if (err) return console.log(err);
			callback(result);
		});
	},
	updateEmailForChangeEmail: function (newE, oldE, callback) {
		let query = "update `khachhang` set `Email` = ? where `Email` =?";
		let bind = [];
		bind.push(newE);
		bind.push(oldE);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return callback(false);
			callback(result);
		});
	},
	findSeatsBooked: function (postID, callback) {
		let query = "select SoGhe from vexe where MaCX=?";
		let bind = [];
		let array_of_seats = [];
		bind.push(postID);
		mysqlDB.query(query, bind, (err, result) => {
			if (err) return console.log(err.message);
			result.map((e) => {
				array_of_seats.push(e.SoGhe);
			});
			callback(array_of_seats);
		});
	},
};
