const express = require("express");
// const bodyParser = require('body-parser')
const fetch = require("node-fetch");
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const emailExistence = require("email-existence");
const Client = require("../../models/Client");
const nodemailer = require("nodemailer");
const {
	doPayment,
	sendMailToCus,
	finalCheckSeatStatus,
	doPaymentM,
} = require("../v1/services/payment.service");

// const { ensureAuthenticated, forwardAuthenticated ,ensureAuthenticatedForAdmin} = require('../config/auth');
// const User = require('../models/User');
// const DbService = require('../models/DbService');

// const Ticket = require('../models/Ticket')
// const nodemailer = require('nodemailer')
// const emailExistence = require('email-existence')
const DbService = require("./services/database.service");
const PmService = require("./services/payment.service");
// const { compare} = require('bcryptjs');

paypal.configure({
	mode: "sandbox", //sandbox or live
	client_id:
		"AWgYYDvYvC35qGNvoTs8QDLUZdl8kmaOISELHK1lAA6GcEhjMc5eCR-c54eOVOLOuNyWQE7fpkoD5w_w",
	client_secret:
		"EDvXzdrHt_E6fWCdiE5ifE27TceUXVCcea9_iO3jl0u4XlFRiFYcrz1Lo6uXaLKKVZ0zOKGh9HfjQdc1",
});

// app.use(express.json)
// app.use(bodyParser.json())

router.use("/user", require("./routes/user.controller"));
router.use("/admin", require("./routes/admin.controller"));
router.use("/payment", require("./routes/payment.controller"));
// router.use('/v1/admin',require('./routes/admin'))

router.get("/seatsbooked", async (req, res) => {
	// endpoint /checkseats
	let seats = req.query.seats.split(",");
	console.log(` [🚌] - getting seatsbooked of ${req.query.postid}.`);
	// DbService.findSeatsBooked(req.query.postid,r =>{
	//   return res.json(r)
	// })
	const f = await PmService.finalCheckSeatStatus(req.query.postid, seats);
	return res.send(f);
});

router.get("/getPostDetails/:postID", (req, res) => {
	DbService.getPostDetailed(req.params.postID, (result) => {
		if (result) return res.status(200).json(result);
	});
});

router.get("/post", (req, res) => {
	console.log(` [ℹ] - getting post infos...`);
	const { id, scope } = req.query;
	scope.includes("seats") // get booked seats of a post via post_id
		? DbService.getSeatsBooked(id, (result) => {
				result
					? res.status(200).json(result)
					: res.status(400).json({ error: "cannot get requestse..." });
		  })
		: scope.includes("detailed") // get more specificed post info via post_id
		? DbService.getPostDetailed(id, (result) => {
				if (result) return res.status(200).json(result);
		  })
		: res.status(200).json({ message: "cannot request with this url..." });
});
//get all trips
router.get("/trips", (req, res) => {
	console.log(` [🚌] - getting all trips...`);
	DbService.getAllTrips((entry) => {
		entry
			? res.status(200).json(entry)
			: res.status(400).json({ error: "failed to get trips." });
	});
});

router.post("/create-bus", (req, res) => {
	const { BienSoXe, LoaiXe, SoLuongGhe } = req.query;
	DbService.addOne(BienSoXe, LoaiXe, SoLuongGhe, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.post("/change-bus", (req, res) => {
	const { BienSoXe, LoaiXe, SoLuongGhe } = req.query;
	DbService.updateBus(LoaiXe, SoLuongGhe, BienSoXe, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.post("/create-trip", (req, res) => {
	const { MaTX, DiemDi, DiemDen, DonGia } = req.query;
	DbService.addTrip(MaTX, DiemDi, DiemDen, DonGia, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.post("/change-trip", (req, res) => {
	const { MaTX, DiemDi, DiemDen, DonGia } = req.query;
	DbService.updateTrip(DiemDi, DiemDen, DonGia, MaTX, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.post("/create-post", (req, res) => {
	const { MaCX, MaTX, BienSoXe, NgayDi, GioDi } = req.query;
	DbService.addPost(MaCX, MaTX, BienSoXe, NgayDi, GioDi, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.post("/change-post", (req, res) => {
	const { MaCX, MaTX, BienSoXe, NgayDi, GioDi } = req.query;
	DbService.updatePost(MaTX, BienSoXe, NgayDi, GioDi, MaCX, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.post("/change-trip", (req, res) => {
	const { BienSoXe, LoaiXe, SoLuongGhe } = req.query;
	DbService.updateBus(LoaiXe, SoLuongGhe, BienSoXe, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ error: "cannot get requestse..." });
	});
});

router.get("/all-ticket", (req, res) => {
	console.log(" [ℹ] - finding ticket ");

	DbService.getAllTicket((result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ message: "failed to get.." });
	});
});

router.get("/buses", (req, res) => {
	console.log(" [ℹ] - finding buses ");

	DbService.getAllBuses((result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ message: "failed to get.." });
	});
});

router.get("/all-buses", (req, res) => {
	console.log(" [ℹ] - finding all buses ");

	DbService.getAllPostsOfTrip((result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ message: "failed to get.." });
	});
});

// same above
router.get("/posts", (req, res) => {
	console.log(" [ℹ] - finding post by date, time....");
	const { tripid, date, time } = req.query;
	DbService.getPostByDateTime(tripid, date, time, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ message: "failed to get.." });
	});
});

router.get("/m/posts", (req, res) => {
	console.log(" [ℹ] - finding post by date, time....<mobile-version>");
	const { tripid, date, time } = req.query;
	let seats = [];

	Array(30)
		.fill(null)
		.map((e, i) => {
			seats.push({
				code: `A${i + 1}`,
				choose: "0",
			});
		});

	DbService.getPostByDateTime(tripid, date, time, (result) => {
		if (result) {
			result.map((e) => {
				seats[parseFloat(e.SoGhe.slice(1, 3)) - 1].choose = "1";
			});
			res.status(200).json(seats);
			// res.json({size:seats.length})
		} else res.status(400).json({ message: "failed to get.." });
	});
});

router.get("/trip", (req, res) => {
	console.log(` [🚌] - getting posts of a trip...`);
	const { tripid, date } = req.query;
	DbService.getPostsOfTripByDate(tripid, date, (result) => {
		result
			? res.status(200).json(result)
			: res.status(400).json({ message: "failed to get posts of trip.." });
	});
});

router.get("/ticket/check", (req, res) => {
	console.log(` [✔] - checking ticket...`);
	let { id } = req.query;
	DbService.checkTicket(id, (result) => {
		result
			? res.status(200).json({ result })
			: res.status(400).json({ message: "failed to check ticket..." });
	});
});

router.post("/m/pay", async (req, res) => {
	// return PmService.doPayment(req,res)
	if (req.body) {
		console.log(req.body);
		console.log(req.user);
		//console.log(JSON.parse(req.body.SLGhe));
		//doPayment(req, res);
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
						//res.status(200).json({ msg: "ok" });
					}
					res.status(400).json({ msg: "not ok" });
				});
			}
		});
	} else {
		return res.send({ status: 1 });
	}
});

router.post("/m/register", (req, res) => {
	console.log("processing...");
	const { name, email, password, password2 } = req.body;
	const role = "user";
	let cash = 0;
	console.log(req.body);
	if (!name || !email) {
		return res.status(401).json({
			msg: "wrong crendentials.",
		});
	}

	// if (password !== password2) {
	// 	return res.status(401).json({
	// 		msg: "wrong crendentials.",
	// 	});
	// }

	// console.log(email)
	emailExistence.check(email, function (error, response) {
		if (error) return res.status(400).json({ msg: "email invalid...." });
		if (response) {
			Client.findOne({ email: email }).then((user) => {
				if (user) {
					console.log("user invalid", user);
					return res.status(401).json({
						msg: "wrong crendentials...",
					});
				} else {
					const newClient = new Client({
						name,
						email,
						password,
						role,
						cash,
					});

					const bind = [
						req.body.email,
						req.body.name,
						req.body.phone,
						req.body.sex,
						req.body.address,
					];

					// bcrypt.genSalt(10, (err, salt) => {

					newClient
						.save()
						.then((user) => {
							DbService.save(bind, (rs) => {
								if (rs) {
									return res.status(200).json(user);
								}
								res.status(400).json({ msg: "failed" });
							});
						})
						.catch((err) => res.status(400).json({ msg: "not OK..." }));
					// });
				}
			});
		} else {
			return res.status(401).json({
				msg: "wrong crendentials...",
			});
		}
	});
});

// router.post('/confirm',async (req,res) =>{
//   console.log(req.body.email)
//     User.updateOne({'email' : req.body.email},{$set: { 'password' : req.body.password}},(err,result)=>{
//         if(err) return res.send({isChanged:false})
//             console.log("done")

//         return res.send({isChanged:true})
//     });

// })

function makeid(length) {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

router.post("/m/forgot", async (req, res) => {
	console.log(req.body.email);
	const passwordRandom = makeid(8);
	Client.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			return res.status(401).json({ msg: "email doesnt exist." });
		}
		Client.updateOne(
			{ email: req.body.email },
			{ $set: { password: passwordRandom } },
			(err, result) => {
				if (err) return res.status(401).json({ msg: "something wrong" });

				const output = `
        <p>Thông báo thay đổi mật khẩu</p>
        <h3>BusExpress</h3>
        <ul>  
          <li>From: BusExpress</li>
          <li>Email: ${req.body.email}</li>
          <li><strong>Your password:</strong>${passwordRandom}</li>
		  <li>Truy cập vào <a href="http://localhost:3000/auth/login">đây</a> để đăng nhập </li>

        </ul>
        `;

				// create reusable transporter object using the default SMTP transport
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: false, // true for 465, false for other ports
					auth: {
						user: "hieudao20031@gmail.com", // generated ethereal user
						pass: "Tronghieu2003@", // generated ethereal password
					},
					tls: {
						rejectUnauthorized: false,
					},
				});

				// setup email data with unicode symbols
				let mailOptions = {
					from: '"BusExpress" <bus@express.com>', // sender address
					to: req.body.email, // list of receivers
					subject: "BookYourBus", // Subject line
					text: "Hello world?", // plain text body
					html: output, // html body
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return res.status(400).json({ msg: error.message });
					}
					console.log("Message sent: %s", info.messageId);
					console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
					console.log("Sent!");
					res.status(200).json({ msg: "OK" });
				});
			}
		);

		// console.log(req.body.email)
	});
});

router.post("/m/success", async (req, res) => {
	// console.log(JSON.parse(req.body.SLGhe));
	doPaymentM(req, res);
	//     }
	// });
});

module.exports = router;
