'use strict';

var Xe = require('../modelsAdmin/xeModels.js');

exports.getAllXe = function(req, res) {
    Xe.getAllXe(function(err, xe) {

        console.log('controller')
        if (err) res.send(err);
       // console.log('res', xe);
        res.send(xe);
    });
};

exports.createXe = function(req, res) {
    var newXe = new Xe(req.body);

    //handles null error
    if(!newXe.BienSoXe){

        res.status(400).send({ error:true, message: 'Please provide BienSoXe' });

    }
    else{

        Xe.createXe(newXe, function(err, xe) {

            if (err)
                res.send(err);
            res.json(xe);
        });
    }
};


exports.getXeById = function(req, res) {
    Xe.getXeById(req.params.BienSoXe, function(err, xe) {
        if (err)
            res.send(err);
        res.json(xe);
    });
};
exports.getXeByMaBX = function(req, res) {
    Xe.getXeByMaBX(req.params.MaBX, function(err, xe) {
        if (err)
            res.send(err);
        res.json(xe);
    });
};

exports.updateXeById = function(req, res) {
    Xe.updateXeById(req.body, function(err,xe) {
        if (err)
            res.send(err);
        res.json(xe);
    });
};


exports.deleteXeById = function(req, res) {


    Xe.remove( req.params.BienSoXe, function(err, xe) {
        if (err)
            res.send(err);
        res.json({ message: 'Xe successfully deleted' });
    });
};