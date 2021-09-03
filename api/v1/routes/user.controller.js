const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
	ensureAuthenticated,
	forwardAuthenticated,
	ensureAuthenticatedAdmin,
} = require("../helpers/authorize");
const jwt = require("jsonwebtoken");
const Client = require("../../../models/Client");
const Ticket = require("../../../models/Ticket");
const Review = require("../../../models/Review");
const USER_ACTIONS = require("../helpers/user.actions");
const ROLE = require("../helpers/role");
const DbService = require("../services/database.service");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const Cancle = require("../../../config/cancle");

const {
	doPayment,
	sendMailToCus,
	finalCheckSeatStatus,
	doPaymentM,
} = require("../services/payment.service");

require("../../../config/passport.conf")(passport);

let uid = null;

router.post("/cancle", verifyToken, (req, res) => {
	console.log("cancle....");
	let TinhTrang = false;
	let { MaVeXe, STK, DonGia, NgayHuy, MaCX, Email } = req.body;
	console.log(MaCX, Email);
	const ticketCancle = new Ticket({
		MaVeXe,
		Email,
		STK,
		DonGia,
		NgayHuy,
		TinhTrang,
	});
	ticketCancle.save().then((user) => {
		if (user) {
			DbService.destroyTicket(MaVeXe, async (result) => {
				if (result) {
					return Cancle.sendMailForCancle(res, req, MaVeXe);
					// res.status(200).send({ is: true, rs: result });
					// UserMysql.updateTickets(-1,MaCX,(result)=>{
					//   if(result){
					//     Cancle.sendMailForCancle(res,req,MaVeXe);
					//     return res.status(200).send({is:true})
					//   }
					//   else return res.status(200).send({is:false})

					// })
				} else {
					console.log("sai 2");
					return res.send({ is: false });
				}
			});
		} else {
			console.log("sai 1");
			res.send({ is: false });
		}
	});
});

router.get("/tickets_cancled", ensureAuthenticated(ROLE.ADMIN), (req, res) => {
	Ticket.find().then((ticket) => {
		res.status(200).json(ticket);
	});
});

router.get("/set_approved", ensureAuthenticated(ROLE.ADMIN), (req, res) => {
	req.query.date
		? Ticket.updateMany(
				{ NgayHuy: req.query.date },
				{ $set: { TinhTrang: true } },
				(err, result) => {
					if (err) return console.log(err);
					res.json(result);
				}
		  )
		: Ticket.updateOne(
				{ MaVeXe: req.query.id },
				{ $set: { TinhTrang: true } },
				(err, result) => {
					if (err) return console.log(err);
					res.json(result);
				}
		  );
});

router.get("/me", verifyToken, (req, res) => {
	res.status(200).json({ user: req.user });
});

router.post("/register", (req, res) => {
	let new_client = new Client(req.body);
	Client.findOne({
		email: new_client.email,
	}).then((user) => {
		if (user) {
			console.log("existing...");
			res
				.status(400)
				.json({ msg: "email is being used, please use another..." });
		} else
			new_client.save().then((rs, err) => {
				if (err)
					return res.status(400).json({
						msg: "failed to register....",
					});
				return res.status(200).json({
					msg: "successed! you can log in now...",
				});
			});
	});
});

router.post("/me", verifyToken, (req, res) => {
	if (req.query.action === USER_ACTIONS.RESET_PASSWORD) {
		//some code change password
		return res.status(200).json({
			message: "reset",
		});
	}
	if (req.query.action === USER_ACTIONS.CHANGE_PASSWORD) {
		//some code reset password
		return res.status(200).json({
			message: "change",
		});
	}
});

router.get("/booked_tickets", verifyToken, (req, res) => {
	DbService.getAllTicketsByEmail(req.user.account.email, (result) => {
		if (result) return res.status(200).json(result);
		return res.status(400).json({
			message: "not OK....",
		});
	});
});

router.post("/booking/:trip_id", (req, res) => {
	let trip_id = req.params.trip_id;
	let infos = req.body;
	console.log(req.user);
	console.log(infos);
	return res.json({
		status: "OK",
	});
});

router.get("/login/error", (req, res) => {
	return res.status(400).json({
		type: "error",
		msg: "Falied to login, maybe wrong crenditals",
	});
});

// router.post('/login', (req, res, next) => {
//   console.log("someone trynna logging in");
//   passport.authenticate('local', {
//     successRedirect: '/api/v1/user/me',
//     failureRedirect: '/api/v1/user/login/error',
//   })(req, res, next);
// });

router.post("/m/login", (req, res, next) => {
	console.log("you are logging in");
	let { email, password } = req.body;
	console.log(req.body);
	Client.findOne({
		email: email,
	}).then((user) => {
		// email not existing
		if (!user) {
			// console.log('wrong');
			return res.status(401).json({
				msg: "unauthorized...",
			});
		}
		// password is not correct
		if (password !== user.password)
			return res.status(401).json({
				msg: "unauthorized...",
			});
		// getting token
		jwt.sign({ user }, "secretkey", (err, token) => {
			if (err) return res.status(200).json({ token });
			DbService.getInfoUser(user.email, (result) => {
				console.log(user.email);
				if (result) {
					return res.status(200).json({
						token: token,
						info: {
							rs: result[0],
							user: user,
						},
					});
				}
				res.status(400).json({ msg: "not OK" });
			});
		});
	});
});

router.get("/logout", (req, res) => {
	req.logout();
	return res.status(200).json({
		msg: "OK",
	});
});

router.get("/tickets", async (req, res) => {
	console.log("getting tickets...");
	DbService.getAllTicketsByEmail(req.query.email, (result) => {
		if (result) return res.status(200).json(result);
	});
	//  k}

	//  });
});

router.post("/avt", upload.single("image"), async (req, res) => {
	try {
		// Upload image to cloudinary
		const result = await cloudinary.uploader.upload(req.file.path);
		Client.updateOne(
			{ email: "shinminah357159@gmail.com" },
			{ $set: { avt: result.secure_url } },
			(err, rs) => {
				if (err) return res.status(400).json({ error: err.message });
				return res.redirect("/user/me");
			}
		);
	} catch (err) {
		console.log(err);
	}
});

router.post("/review", verifyToken, (req, res) => {
	// const {plate,date_go,trip_id, stars, times} = req.body
	// console.log(`Yo`);
	let new_review = new Review(req.body);

	Review.findOne({
		trip_id: req.body.trip_id,
	}).then((rs, err) => {
		if (err) return res.status(400).json({ msg: "failed to request.." });
		if (rs) {
			Review.updateOne(
				{ trip_id: req.body.trip_id },
				{ $set: { times: rs.times + 1, stars: rs.stars + req.body.stars } },
				(err, rs) => {
					if (err) return res.status(400).json({ error: err.message });
					return res.status(200).json({ msg: "reviewed successfully..." });
				}
			);
		} else {
			new_review.save().then((rs, err) => {
				if (err)
					return res.status(400).json({ message: "failed to review..." });
				return res.status(200).json({
					message: `reviewed successfully..`,
				});
			});
		}
	});
});

// router.post('/profile',(req, res) =>{
//   DbService.updateCus(req.body.email,req.body, (result) => {
//     if(result){
//       return res.status(200).json({msg: 'updated successfully...'})
//     }
//     res.status(202).json({msg: 'cannot update...'})
//   })
// })

router.post("/m/profile", verifyToken, async (req, res) => {
	console.log(req.user.account.password, req.body.old);
	if (!req.body.new || req.body.new.length < 6) {
		return res.status(400).json({ msg: "wrong credentials..." });
	}
	if (req.body.old === req.user.account.password) {
		Client.updateOne(
			{ email: req.user.account.email },
			{ $set: { password: req.body.new } },
			(err, result) => {
				if (err) return res.status(400).json({ msg: "wrong credentials..." });
				return res.status(200).json({ msg: "OK" });
			}
		);
	} else {
		return res.status(400).json({ msg: "wrong credentials..." });
	}
});

router.post("/m/pay", async (req, res) => {
	console.log(req.body);
	// console.log(req.user);
	// console.log(JSON.parse(req.body.SLGhe));
	const { SDT, DiaChi, SLGhe, DonGia, NgayDat, MaCX } = req.body;
	DbService.findCusByEmail(req.body.Email, (result) => {
		console.log(result);
		if (result.length == 0) {
			console.log("first time booked...");
			let bind = [
				req.body.Email,
				req.body.TenKH,
				req.body.SDT,
				req.body.GioiTinh,
				req.body.DiaChi,
			];
			DbService.save(bind, (rs) => {
				if (rs) {
					return doPaymentM(req, res);
				}
				res.status(400).json({ msg: "failed" });
			});
		} else {
			//console.log('me 2');
			DbService.updateCus(req.body.Email, req.body, (result) => {
				if (result) {
					console.log("have booked...");
					// console.log('mesdas', result);
					console.log("update");
					return doPaymentM(req, res);
					// return res.status(200).json({msg:'ok'})
				}
				res.status(400).json({ msg: "not ok" });
			});
		}
	});

	// });
	// Client.updateOne({'email': req.body.trip_id},{$set: { 'times' : rs.times + 1,'stars': rs.stars + req.body.stars}},(err, rs) =>{
	//   if(err) return res.status(400).json({error:err.message})
	//   return res.status(200).json({msg:'reviewed successfully...'})
	// })

	//   doPaymentM(req, res)
	//     }
});

function verifyToken(req, res, next) {
	let bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		jwt.verify(bearerToken, "secretkey", (err, authData) => {
			if (err) {
				res.sendStatus(403);
			} else {
				DbService.getInfoUser(authData.user.email, (result) => {
					if (result) {
						req.user = {
							account: authData.user,
							info: result[0] || [],
						};
						next();
					} else return res.status(400).json({ msg: "failed" });
				});

				// res.status(200).json(authData);
			}
		});
	} else {
		// Forbidden
		return res.send("Your session is expried!");
	}
}

module.exports = router;
