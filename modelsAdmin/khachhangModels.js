'user strict';
var sql = require('./db.js');

//Task object constructor
var KhachHang = function(khachhang){
    console.log(khachhang);
    this.Email=khachhang.Email;
	this.TenKH=khachhang.TenKH;
	this.SDT=khachhang.SDT;
	this.GioiTinh=khachhang.GioiTinh;
	this.DiaChi=khachhang.DiaChi;
};

KhachHang.getKhachHangById = function createUser(Email, result) {
    sql.query("Select * from khachhang where Email = ? ", Email, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
KhachHang.getAllKhachHang = function getAllKhachHang(result) {
    sql.query("Select * from khachhang", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           // console.log('KhachHang : ', res);

            result(null, res);
        }
    });
};
KhachHang.updateKhachHangById = function(Email,khachhang,result){
	sql.query("UPDATE khachhang SET TenKH=?, SDT=?, GioiTinh=?, DiaChi=? WHERE Email=?",[khachhang.TenKH, khachhang.SDT, khachhang.GioiTinh, khachhang.DiaChi, Email],function(err,res){
		if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
	});
};

module.exports= KhachHang;// JavaScript Document// JavaScript Document