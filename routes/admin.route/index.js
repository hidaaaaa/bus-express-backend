const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated ,ensureAuthenticatedForAdmin} = require('../../config/auth');


const API_BenXe = require("../admin.route/benxeRoutes");
const API_Xe = require("../admin.route/xeRoutes");
// const API_tuyenXe = require("../admin.route/tuyenxeRoutes");
// const API_ChuyenXe = require("../admin.route/chuyenxeRoutes");
// const API_KhachHang = require("../admin.route/khachhangRoutes");
// const API_ChiTietVeXe = require("../admin.route/chitietvexeRoutes");
// const API_ChiTietVeXeHuy = require("../admin.route/chitietvexehuyRoute");
// const API_HoaDon = require("../admin.route/hoadonRoutes");
// //const routesTaiKhoan = require('./routesAdmin/taikhoanRoutes');
// const API_User = require("../admin.route/userRoutes");
router.use('/',API_Xe)

router.get("/allusers", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/user");
});
router.get("/tablebenxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableBenXe");
});
router.get("/tablexe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableXe");
});
router.get("/tabletuyenxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableTuyenXe");
});
router.get("/tablechuyenxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableChuyenXe");
});
router.get("/tablekhachhang", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableKhachHang");
});
router.get("/tablevexe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableVeXe");
});
router.get("/tablehoadon", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableHoaDon");
});
router.get("/editbenxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/editBenXe");
});
router.get("/editxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/editXe");
});
router.get("/edittuyenxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/editTuyenXe");
});
router.get("/editchuyenxe", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/editChuyenXe");
});
router.get("/editkhachhang", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/editKhachHang");
});
router.get("/statistical", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/statistical");
});
router.get("/huyve", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/huyVeXe");
});
router.get("/duyetvehuy", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/DuyetVeHuy");
});
router.get("/doanhthu", ensureAuthenticatedForAdmin, function (req, res) {
  res.render("admin/tableDoanhThu");
});

module.exports = router