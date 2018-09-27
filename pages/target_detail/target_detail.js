// pages/index2/index.js
const util = require('../../utils/util.js');
const _ = require('../../utils/k-lodash.js');
const config = require('../../config');
const StorageDB = require('../../utils/storage.js');
// const everydayM = new StorageDB('everydays');

let targetZ = new wx.BaaS.TableObject(config.table_ids.target);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    targets: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    targetZ.find().then(res => {
      _this.setData({targets: res.data.detail});
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

})