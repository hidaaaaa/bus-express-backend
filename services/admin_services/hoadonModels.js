'user strict';
var sql = require('../../database/connection');
;

//Task object constructor
var HoaDon = function(hoadondatvexe){
    console.log(hoadondatvexe);
    this.MaHD = hoadondatvexe.MaHD;
    this.MaVeXe = hoadondatvexe.MaVeXe;
    this.Email = hoadondatvexe.Email;
	this.NgayDat = hoadondatvexe.NgayDat;
};
HoaDon.getAllHoaDon = function getAllHoaDon(result) {
    sql.query("Select * from hoadon", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
           // console.log('Ben Xe : ', res);

            result(null, res);
        }
    });
};
module.exports= HoaDon;