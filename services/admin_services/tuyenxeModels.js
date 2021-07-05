'user strict';
var sql = require('../../database/connection');


//Task object constructor
var TuyenXe = function(tuyenxe){
    console.log(tuyenxe);
    this.MaTX = tuyenxe.MaTX;
    this.DiemDi = tuyenxe.DiemDi;
    this.DiemDen = tuyenxe.DiemDen;
	this.DonGia=tuyenxe.DonGia;
};
TuyenXe.createTuyenXe = function createUser(newTuyenXe, result) {
    sql.query("INSERT INTO tuyenxe set ?", newTuyenXe, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
         //   console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
TuyenXe.getTuyenXeById = function createUser(MaTX, result) {
    sql.query("Select * from tuyenxe where MaTX = ? ", MaTX, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
TuyenXe.getAllTuyenXe = function getAllTuyenXe(result) {
    sql.query("Select * from tuyenxe", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           // console.log('TuyenXe : ', res);

            result(null, res);
        }
    });
};
TuyenXe.updateTuyenXeById = function(MaTX, tuyenxe, result){
    sql.query("UPDATE tuyenxe SET  DiemDi= ?, DiemDen= ?, DonGia=? WHERE MaTX = ?", [tuyenxe.DiemDi,tuyenxe.DiemDen,tuyenxe.DonGia,MaTX], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
TuyenXe.remove = function(MaTX, result){
    sql.query("DELETE FROM tuyenxe WHERE MaTX = ?", [MaTX], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= TuyenXe;