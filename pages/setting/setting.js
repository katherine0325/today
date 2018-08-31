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
    everyday: [],
    random: [],
    tuseday: [],
    wendsday: [],
    turseday: [],
    friday: [],
    saturday: [],
    sunday: [],
    date: [],
    create_context: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.init();
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
   * 初始化数据
   */
  init: function() {
    const everydays = everydayM.find({});
    const randoms = randomM.find({});
    const mondays = mondayM.find({});
    const tusedays = tusedayM.find({});
    const wednsdays = wednsdayM.find({});
    const tursedays = tusedayM.find({});
    const fridays = fridayM.find({});
    const saturdays = saturdayM.find({});
    const sundays = sundayM.find({});

    this.setData({
      everydays,
      randoms,
      mondays,
      tusedays,
      wednsdays,
      tursedays,
      friday,
      saturdays,
      sundays
    });
  },

  /**
   * 今日任务文本框内容变化
   */
  changeText: function(e) {
    const _this = this;

    _this.setData({create_context: e.detail.value});
  },

  /**
   * 今日任务提交按钮
   */
  submitToday: function() {
    const _this = this;

    const todayData = wx.getStorageSync('todayData');
    todayData.push(_this.data.create_context);
    wx.setStorageSync('todayData');
  }
})