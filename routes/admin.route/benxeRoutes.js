"use strict";
const express = require("express");
const router = express.Router();
console.log('ok')

var todoList = require("../../controllers/admin.controller/benxeControllers");

router.route("/diemdi/:MaTX").get(todoList.getDiemDi);

router.route("/diemden/:MaTX").get(todoList.getDiemDen);

router.route("/benxe").get(todoList.getAllBenXe).post(todoList.createBenXe);

router
  .route("/benxe/:MaBX")
  .get(todoList.getBenXeById)
  .put(todoList.updateBenXeById)
  .delete(todoList.deleteBenXeById);


 module.exports = router
