'use strict';

var KhachHang = require('../modelsAdmin/khachhangModels.js');

exports.getAllKhachHang = function(req, res) {
    KhachHang.getAllKhachHang(function(err, khachhang) {

        console.log('controller')
        if (err) res.send(err);
      //  console.log('res', khachhang);
        res.send(khachhang);
    });
};
exports.getKhachHangById = function(req, res) {
    KhachHang.getKhachHangById(req.params.Email, function(err, khachhang) {
        if (err)
            res.send(err);
        res.json(khachhang);
    });
};
exports.updateKhachHangById = function(req, res) {
    KhachHang.updateKhachHangById(req.params.Email, new KhachHang(req.body), function(err,khachhang) {
        if (err)
            res.send(err);
        res.json(khachhang);
    });
};


