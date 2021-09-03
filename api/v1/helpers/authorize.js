const Role = require("../helpers/role");

module.exports = {
	ensureAuthenticated: function (roles = []) {
		console.log("auth");
		// if (req.isAuthenticated()) {
		//     return next()
		// }
		// return res.json({
		//     status: 403,
		//     message: 'Not Authorized.'
		// })
		return (req, res, next) => {
			if (!req.user) {
				console.log("nnauthorized...");
				return res.status(401).json({ message: "nnauthorized..." });
			}

			if (!roles.includes(req.user.role)) {
				// user's role is not authorized
				console.log("nnauthorized...");
				return res.status(401).json({ message: "Accesss denied..." });
			}

			// authentication and authorization successful
			next();
		};
	},
	forwardAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		//  console.log(req.user)
		res.redirect("/home");
	},
	ensureAuthenticatedAdmin: function (req, res, next) {
		// console.log("got this far");
		if (req.isAuthenticated() && req.user.role === Role.ADMIN) {
			return next();
		}
		return res.status(400).json({
			status: 401,
			message: "access denied...",
		});
	},
	ensureAuthenticatedForUser: function (req, res, next) {
		if (req.isAuthenticated()) {
			//// console.log(req.user)
			if (req.user.role === Role.USER) return next();
			return res.redirect("/home");
		}
		return res.status(400).json({
			status: 401,
			message: "access denied...",
		});
	},
};
