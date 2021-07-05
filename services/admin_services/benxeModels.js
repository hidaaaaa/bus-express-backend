'user strict';
var sql = require('../../database/connection');


//Task object constructor
var BenXe = function(benxe){
    console.log(benxe);
    this.MaBX = benxe.MaBX;
    this.TenBX = benxe.TenBX;
    this.DiaChi = benxe.DiaChi;
};
BenXe.createBenXe = function createUser(newBenXe, result) {
    sql.query("INSERT INTO benxe set ?", newBenXe, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            //console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
BenXe.getBenXeById = function createUser(MaBX, result) {
    sql.query("Select * from benxe where MaBX = ? ", MaBX, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
BenXe.getDiemDi = function (MaTX, result) {
	sql.query("Select * from benxe where DiaChi = ( Select DiemDi from tuyenxe where MaTX = ? )",MaTX,function(err,res){
		if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
	});
};
BenXe.getDiemDen = function (MaTX, result) {
	sql.query("Select * from benxe where DiaChi = ( Select DiemDen from tuyenxe where MaTX = ? )",MaTX,function(err,res){
		if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
	});
};
BenXe.getAllBenXe = function getAllBenXe(result) {
    sql.query("Select * from benxe", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
          //  console.log('Ben Xe : ', res);

            result(null, res);
        }
    });
};
BenXe.updateBenXeById = function(MaBX, benxe, result){
    sql.query("UPDATE benxe SET  TenBX= ?, DiaChi= ? WHERE MaBX = ?", [benxe.TenBX,benxe.DiaChi,MaBX], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
BenXe.remove = function(MaBX, result){
    sql.query("DELETE FROM benxe WHERE MaBX = ?", [MaBX], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= BenXe;