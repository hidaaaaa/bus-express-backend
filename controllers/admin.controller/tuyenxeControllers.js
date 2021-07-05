'use strict';

var TuyenXe = require('../../services/admin_services/tuyenxeModels.js');

exports.getAllTuyenXe = function(req, res) {
    TuyenXe.getAllTuyenXe(function(err, tuyenxe) {

        console.log('controller')
        if (err) res.send(err);
       // console.log('res', tuyenxe);
        res.send(tuyenxe);
    });
};

exports.createTuyenXe = function(req, res) {
    var newTuyenXe = new TuyenXe(req.body);

    //handles null error
    if(!newTuyenXe.MaTX){

        res.status(400).send({ error:true, message: 'Please provide MaTX' });

    }
    else{

        TuyenXe.createTuyenXe(newTuyenXe, function(err, tuyenxe) {

            if (err)
                res.send(err);
            res.json(tuyenxe);
        });
    }
};


exports.getTuyenXeById = function(req, res) {
    TuyenXe.getTuyenXeById(req.params.MaTX, function(err, tuyenxe) {
        if (err)
            res.send(err);
        res.json(tuyenxe);
    });
};


exports.updateTuyenXeById = function(req, res) {
    TuyenXe.updateTuyenXeById(req.params.MaTX, new TuyenXe(req.body), function(err,tuyenxe) {
        if (err)
            res.send(err);
        res.json(tuyenxe);
    });
};


exports.deleteTuyenXeById = function(req, res) {


    TuyenXe.remove( req.params.MaTX, function(err, tuyenxe) {
        if (err)
            res.send(err);
        res.json({ message: 'Tuyen Xe successfully deleted' });
    });
};