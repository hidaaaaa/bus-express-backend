'user strict';
var sql = require('../../database/connection');

//not using
//Task object constructor
var TaiKhoan = function(taikhoan){
    console.log(taikhoan);
    this.Email = taikhoan.Email;
    this.Pass = taikhoan.Pass;
    this.SoDu = taikhoan.SoDu;
};
TaiKhoan.getAllTaiKhoan = function getAllTaiKhoan(result) {
    sql.query("Select * from taikhoan", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
        //    console.log('Ben Xe : ', res);

            result(null, res);
        }
    });
};
module.exports= TaiKhoan;