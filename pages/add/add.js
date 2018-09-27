// pages/setting/setting.js
const util = require('../../utils/util.js');
const StorageDB = require('../../utils/storage.js');
const everydayM = new StorageDB('everydays');
const randomM = new StorageDB('randoms');
const mondayM = new StorageDB('mondays');
const tuesdayM = new StorageDB('tuesdays');
const wednesdayM = new StorageDB('wednesdays');
const thursdayM = new StorageDB('thursdays');
const fridayM = new StorageDB('fridays');
const saturdayM = new StorageDB('saturdays');
const sundayM = new StorageDB('sundays');
const dateM = new StorageDB('dates');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    create_type: '',
    create_date: '',
    create_context: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.type) {
      wx.showToats({
        icon: 'none',
        title: '类型遗失，请返回重新点入'
      });
      return false;
    }

    this.setData({ create_type: options.type});
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

  /**
   * 文本框内容变化
   */
  changeText: function(e) {
    const _this = this;

    _this.setData({create_context: e.detail.value});
  },

  /**
   * 选择日期
   */
  changeDate: function(e) {
    const _this = this;

    _this.setData({create_date: e.detail.value});
  },

  /**
   * 提交按钮
   */
  submit: function() {
    const _this = this, storageM = new StorageDB(this.data.create_type);

    if(!_this.data.create_type) {
      wx.showToast({
        icon: 'none',
        title: '丢失分类，请返回重试',
      });
      return false;
    }

    if (_this.data.create_type == 'dates' && !_this.data.create_date) {
      wx.showToast({
        icon: 'none',
        title: '请选择日期',
      });
      return false;
    }

    if(!_this.data.create_context) {
      wx.showToast({
        icon: 'none',
        title: '代办事项为空，不能提交',
      });
      return false;
    }

    const data = {name: _this.data.create_context};
    if(_this.data.create_type == 'dates') {
      data.date = _this.data.create_date
    }
    const result = storageM.insert(data);
    console.log(result);

    this.setData({create_context: ''});

    wx.showToast({
      title: '添加成功',
    })
  },
  
})