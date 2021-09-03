const paypal = require("paypal-rest-sdk");
const nodemailer = require("nodemailer");
const DbService = require("../services/database.service");
const jwt = require("jsonwebtoken");

const client = require("twilio")(
	"AC6535235a8a08095181d8689c33135bb4",
	"ade52de0cdd1fe620af4b329bd892f8e"
);
console.log(process.env.TWILIO_ACCOUNT_SID);

paypal.configure({
	mode: "sandbox", //sandbox or live
	client_id:
		"AWgYYDvYvC35qGNvoTs8QDLUZdl8kmaOISELHK1lAA6GcEhjMc5eCR-c54eOVOLOuNyWQE7fpkoD5w_w",
	client_secret:
		"EDvXzdrHt_E6fWCdiE5ifE27TceUXVCcea9_iO3jl0u4XlFRiFYcrz1Lo6uXaLKKVZ0zOKGh9HfjQdc1",
});

const doPayment = async function (req, res) {
	console.log("...do paypal");
	let { MaCX, SLGhe, NgayDat, Email } = req.body;
	let encode = await encodeData(req.body);
	// console.log(encode)
	const create_payment_json = {
		intent: "sale",
		payer: {
			payment_method: "paypal",
		},
		redirect_urls: {
			return_url: `http://localhost:3000/home/buy?tripid=${MaCX}&date=${NgayDat}&step=3`,
			cancel_url: "http://localhost:3000/cancel",
		},
		transactions: [
			{
				item_list: {
					items: [
						{
							name: "Red Sox Hat",
							sku: "001",
							price: "5.00",
							currency: "USD",
							quantity: 1,
						},
					],
				},
				amount: {
					currency: "USD",
					total: "5.00",
				},
				description: "Red tiger hat for devs",
			},
		],
	};

	paypal.payment.create(create_payment_json, async function (error, payment) {
		if (error) {
			console.log(error.message);
			return { status: 2 };
			// throw error;
		} else {
			console.log("paying....");
			for (let k = 0; k < payment.links.length; k++) {
				if (payment.links[k].rel === "approval_url") {
					console.log(payment.links[k].href);
					return res.send({ msg: "ok", link: payment.links[k].href });
					// res.redirect(payment.links[i].href);
				}
			}
		}
	});
};
const sendMailToCus = function (res, req, data) {
	console.log("mes", data);
	// client.messages
	// 	.create({
	// 		body: `Đi ngày : ${new Date(data.NgayDat).toLocaleDateString()}
	// 		 ,Chuyến xe: TPHCM - KienGiang, Số Ghế:${data.SLGhe.toString}`,
	// 		body: "CHao",
	// 		from: "+19724357719",
	// 		to: "+84333157628",
	// 	})
	// 	.then((message) =>
	// 		console.log({
	// 			state: "Sent.",
	// 			messageId: message.id,
	// 		})
	// 	)
	// 	.catch((e) =>
	// 		console.log({
	// 			type: "error",
	// 			message: e.message,
	// 		})
	// 	);

	DbService.getInfoPost(data.MaCX, (result) => {
		if (result.length > 0) {
			DbService.getPostDetailed(data.MaCX, (value) => {
				console.log("93", value);
				const output = `
				<p>Thông báo đặt vé thành công</p>
				<h3>Bus Express</h3>
				<ul>  
				  <li>From: Bus Express</li>
				  <li>Email: buexpressbusiness@gmail.com</li>
				  <li>Hot line: 19000153157</li>
				  <li>Đi ngày:${new Date(result[0].NgayDi).toLocaleDateString()}</li>
				  <li>Chuyến xe: ${value[0].DiemDi} => ${value[0].DiemDen}</li>
				  <li>Số Ghế:${data.SLGhe.toString()}</li>
				  <li>Xe:${result[0].BienSoXe}</li>
				 
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
					from: "[BusExpress.com] <shinminah357159@email.com>", // sender addresponses
					to: data.Email, // list of receivers
					subject: "BusExpress", // Subject line
					text: "Hello world?", // plain text body
					html: output, // html body
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log(error.message);
						return;
						// return res.send({status:false})
					}
					console.log("Message sent: %s", info.messageId);
					console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
					console.log("Sent!");
					// res.send({status:true})
				});
			});
		} else {
			return res.status(400).json({ msg: "Cannot find this post" });
		}
	});
};
const finalCheckSeatStatus = function (postid, seats) {
	return new Promise((resolve) => {
		DbService.findSeatsBooked(postid, (result) => {
			if (result) {
				console.log(result);
				let found = result.some((r) => seats.indexOf(r) >= 0);
				if (found) resolve(true);
				else resolve(false);
			}
		});
	});
};
const doPaymentM = async function (req, res) {
	//console.log(req.body.SLGhe.toString());
	let SLGhe = req.body.SLGhe;
	console.log(SLGhe);
	const isMatched = await finalCheckSeatStatus(req.body.MaCX, SLGhe);
	if (isMatched) return res.status(400).json({ msg: "failed" });
	for (let i = 0; i < SLGhe.length; i++) {
		console.log(i);
		bind = [];
		bind.push(req.body.MaCX + SLGhe[i]);
		bind.push(req.body.MaCX);
		bind.push(SLGhe[i]);
		DbService.saveTicket(bind, (result) => {
			if (result) {
				bind = [];
				bind.push(req.body.MaCX + SLGhe[i]);
				bind.push(req.body.Email);
				bind.push(req.body.NgayDat);

				DbService.saveBillTicket(bind, (result) => {
					if (result) {
						console.log("me", result);
						if (i == SLGhe.length - 1) {
							sendMailToCus(res, req, req.body);
							return res.status(200).json({ success: true, data: [] });
						}
					} else res.status(204).send({ msg: result.msg });
				});
			} else {
				return res.status(400).json({ msg: result.msg });
			}
		});
	}
};

module.exports = {
	doPayment: doPayment,
	doPaymentM: doPaymentM,
	sendMailToCus: sendMailToCus,
	finalCheckSeatStatus: finalCheckSeatStatus,
};

function encodeData(data) {
	return new Promise((resolve, reject) => {
		jwt.sign(data, "secretkey", (err, token) => {
			if (err) return reject(err.message);
			// console.log(token)
			resolve(token);
		});
	});
}
