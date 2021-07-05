const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  MaVeXe: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  STK: {
    type: String,
    required: true
  },
  DonGia:{
    type: Number,
    required: true
  },
  NgayHuy:{
    type: String,
    required: true
  },
  TinhTrang: {
    type: Boolean,
    required: true
  }

});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
