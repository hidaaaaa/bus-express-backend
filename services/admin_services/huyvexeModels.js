'user strict';
var sql = require('../../database/connection');


//Task object constructor

module.exports = {
    findTicketById:function(id,callback){
        let query = 'select * from vexe,hoadon,phancongchuyenxe where vexe.MaVeXe = hoadon.MaVeXe and vexe.MaCX = phancongchuyenxe.MaCX and vexe.MaVeXe =?';
        sql.query(query,id,(err,result)=>{
            let e = false;
            if(err) return callback(e)
                callback(result)
        })
    },
    destroyTicket:function(id,callback){
        let query = 'delete from vexe where vexe.MaVeXe = ?'
        sql.query(query,id,(err, result) =>{
            if(err) return callback(false)
                callback(result)
        })
    },
    updateTickets: function(tickets,postID, callback){
    let query = 'update `chuyenxe` set `SoVeHienCon` =(select `SoVeHienCon` from `chuyenxe` where `MaCX`=?) - ? where MaCX=?'
    let bind = [];
    bind.push(postID);
    bind.push(tickets);
    bind.push(postID);
        let not = false;
    sql.query(query,bind,(err, result) =>{
        if(err) return console.log("lôi day ne")
            callback(result)
    })
 }
}