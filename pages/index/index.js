//index.js
const app = getApp()
var address = require("address.js")

Page({
  data: {
    current: {
      province: { code: 0, name: "省" },
      city: { code: 0, name: "市" },
      area: { code: 0, name: "区/县" }
    },
    address: [],
    active: 1
  },

  onLoad() {
    this.setData({
      address: address.province(),
      active: 1 })
  },
  tapItem(e) {
    var data = e.target.dataset;
    var code = data.code;
    code = parseInt(code);
    if (code % 10000 == 0) {
      // 市
      var city = address.city(code);
      this.setData({
        address: city, 
        current: {
          province: data,
          city: { code: 0, name: "市" },
          area: { code: 0, name: "区/县" }
        },
        active: 2
      })
    } else if (code % 100 == 0) {
      // 区
      var area = address.area(code);
      this.setData({
        address: area,
        current: {
          province: this.data.current.province,
          city: data,
          area: { code: 0, name: "区/县" }
        },
        active: 3
     })
    } else {
      this.setData({
        current: {
          province: this.data.current.province,
          city: this.data.current.city,
          area: data
        },
        active: 3
      })
      console.log(code);
    }
  },
  tapProvince(e) {
    this.setData({
      address: address.province(),
      active: 1 })
  },
  tapCity(e) {
    var code = this.data.current.province.code;
    code = parseInt(code);
    if (0 == code) {
      return;
    }
    this.setData({
      address: address.city(code),
      active: 2 })
  }
})
