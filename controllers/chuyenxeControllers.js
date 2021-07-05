'use strict';

var ChuyenXe = require('../modelsAdmin/chuyenxeModels.js');

exports.getAllChuyenXe = function(req, res) {
    ChuyenXe.getAllChuyenXe(function(err, chuyenxe) {

        console.log('controller')
        if (err) res.send(err);
       // console.log('res', chuyenxe);
        res.send(chuyenxe);
    });
};

exports.createChuyenXe = function(req, res) {
    var newChuyenXe = new ChuyenXe(req.body);

    //handles null error
    if(!newChuyenXe.MaCX){

        res.status(400).send({ error:true, message: 'Please provide MaCX' });

    }
    else{

        ChuyenXe.createChuyenXe(newChuyenXe, function(err, chuyenxe) {

            if (err)
                res.send(err);
            res.json(chuyenxe);
        });
    }
};


exports.getChuyenXeById = function(req, res) {
    ChuyenXe.getChuyenXeById(req.params.MaCX, function(err, chuyenxe) {
        if (err)
            res.send(err);
        res.json(chuyenxe);
    });
};


exports.updateChuyenXeById = function(req, res) {
    ChuyenXe.updateChuyenXeById(req.params.MaCX, new ChuyenXe(req.body), function(err,chuyenxe) {
        if (err)
            res.send(err);
        res.json(chuyenxe);
    });
};


exports.deleteChuyenXeById = function(req, res) {


    ChuyenXe.remove( req.params.MaCX, function(err, chuyenxe) {
        if (err)
            res.send(err);
        res.json({ message: 'Chuyen Xe successfully deleted' });
    });
};// JavaScript Document