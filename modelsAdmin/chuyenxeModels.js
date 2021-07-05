'user strict';
var sql = require('./db.js');

//Task object constructor
var ChuyenXe = function(chuyenxe){
    console.log(chuyenxe);
    this.MaCX=chuyenxe.MaCX;
	this.MaTX=chuyenxe.MaTX;
	this.BienSoXe=chuyenxe.BienSoXe;
	this.MaBXDi=chuyenxe.MaBXDi;
	this.MaBXDen=chuyenxe.MaBXDen;
	this.NgayDi=chuyenxe.NgayDi;
	this.GioDi=chuyenxe.GioDi;
	this.SoVeHienCon=chuyenxe.SoVeHienCon;
};
ChuyenXe.createChuyenXe = function createUser(newChuyenXe, result) {
    sql.query("INSERT INTO chuyenxe set ?", newChuyenXe, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
          //  console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
ChuyenXe.getChuyenXeById = function createUser(MaCX, result) {
    sql.query("Select * from chuyenxe where MaCX = ? ", MaCX, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
ChuyenXe.getAllChuyenXe = function getAllChuyenXe(result) {
    sql.query("Select * from chuyenxe", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
          //  console.log('ChuyenXe : ', res);

            result(null, res);
        }
    });
};
ChuyenXe.updateChuyenXeById = function(MaCX, chuyenxe, result){
    sql.query("UPDATE chuyenxe SET  MaTX=?, BienSoXe=?, MaBXDi=?, MaBXDen=?, NgayDi=?, GioDi=?, SoVeHienCon=? WHERE MaCX = ?", [chuyenxe.MaTX,chuyenxe.BienSoXe,chuyenxe.MaBXDi,chuyenxe.MaBXDen,chuyenxe.NgayDi,chuyenxe.GioDi,chuyenxe.SoVeHienCon,MaCX], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
ChuyenXe.remove = function(MaCX, result){
    sql.query("DELETE FROM chuyenxe WHERE MaCX = ?", [MaCX], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= ChuyenXe;// JavaScript Document