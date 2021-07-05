const express = require('express')
const router = express.Router();
const paypal = require('paypal-rest-sdk')
const { ensureAuthenticated, forwardAuthenticated ,ensureAuthenticatedAdmin} = require('../helpers/authorize');
const Client = require('../../../models/Client');
//const UserMysql = require('../models/UserMysql');
const {doPayment, sendMailToCus,checkSeatAgain} = require('../../../config/payment.gateway');
const emailExistence = require('email-existence')


// Global variables
let customer;




router.get('/',async  (req, res) => {
    if(!req.query.method || !req.query.status)
        return res.status(400).json({
            type: 'error',
            message: 'Wrong direction'
        })
    res.status(200).json({
        status: 'OK',
        message : 'successfully.'
    })
});


module.exports = router;
