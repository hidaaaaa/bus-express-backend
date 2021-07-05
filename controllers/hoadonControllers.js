'use strict';

var HoaDon = require('../modelsAdmin/hoadonModels.js');

exports.getAllHoaDon = function(req, res) {
    HoaDon.getAllHoaDon(function(err, hoadon) {

        console.log('controller hoa dow')
        if (err) res.send(err);
       // console.log('res',hoadondatvexe);
        res.send(hoadon);
    });
};
exports.getDoanhThu=function(req,res){
    HoaDon.getDoanhThu(req.params.NgayDat,function(err,result){
        console.log('controller')
        if (err) res.send(err);
       // console.log('res',hoadondatvexe);
        res.send(result);
    });
};