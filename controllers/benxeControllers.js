'use strict';

var BenXe = require('../modelsAdmin/benxeModels.js');

exports.getAllBenXe = function(req, res) {
    BenXe.getAllBenXe(function(err, benxe) {

        console.log('controller')
        if (err) res.send(err);
       // console.log('res', benxe);
        res.send(benxe);
    });
};

exports.createBenXe = function(req, res) {
    var newBenxe = new BenXe(req.body);

    //handles null error
    if(!newBenxe.MaBX){

        res.status(400).send({ error:true, message: 'Please provide MaBX' });

    }
    else{

        BenXe.createBenXe(newBenxe, function(err, benxe) {

            if (err)
                res.send(err);
            res.json(benxe);
        });
    }
};

exports.getDiemDi=function(req,res){
	BenXe.getDiemDi(req.params.MaTX,function(err,benxe){
		if(err)res.send(err);
		res.json(benxe);
	});
};
exports.getDiemDen=function(req,res){
	BenXe.getDiemDen(req.params.MaTX,function(err,benxe){
		if(err)res.send(err);
		res.json(benxe);
	});
};

exports.getBenXeById = function(req, res) {
    BenXe.getBenXeById(req.params.MaBX, function(err, benxe) {
        if (err)
            res.send(err);
        res.json(benxe);
    });
};


exports.updateBenXeById = function(req, res) {
    BenXe.updateBenXeById(req.params.MaBX, new BenXe(req.body), function(err,benxe) {
        if (err)
            res.send(err);
        res.json(benxe);
    });
};


exports.deleteBenXeById = function(req, res) {


    BenXe.remove( req.params.MaBX, function(err, benxe) {
        if (err)
            res.send(err);
        res.json({ message: 'Ben Xe successfully deleted' });
    });
};