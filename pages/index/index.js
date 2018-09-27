// pages/index2/index.js
const util = require('../../utils/util.js');
const _ = require('../../utils/k-lodash.js');
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
const todayM = new StorageDB('todays');
const tomorrowM = new StorageDB('tomorrows');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayData: [],
    isShowMenu: false,
    curMenuId: null,
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
   * 初始化
   */
  init: function() {
    const today = new Date();
    const cur_week = today.getDay();
    const todayStr = util.formatDate(today);
    const curTodayStr = wx.getStorageSync('todayStr');
    let todayData = todayM.find({});

    if (curTodayStr == todayStr) {
      this.setData({ todayData: todayData })
    } else {
      if (!!!wx.getStorageSync('isFirstTime')) {
        todayData = [
          {name: '点击完成'},
          {name: '长按弹出按钮，可将事项作调整，调整后内容可在设定对应项中查看'},
          {name: '通过在设定中安排每日事项'},
          {name: '只显示当天的事项不被未来安排的事项干扰'},
          {name: '每天刷新事项，昨天的事就让它随风逝去吧'},
          {name: '安排好事项之后，如果想要当天立刻显示，可以点击设定中的【重载今日事项】按钮刷新今日事项'}
        ];
        wx.setStorageSync('isFirstTime', true);
      } else {
        todayData = [];
      }
      // 每天
      const everyday = everydayM.find({});
      // 随机
      const randoms = randomM.find({});
      const random = [randoms[parseInt(Math.random() * randoms.length)]];
      // 周天
      const weekData = [];
      weekData[0] = sundayM.find({});
      weekData[1] = mondayM.find({});
      weekData[2] = tuesdayM.find({});
      weekData[3] = wednesdayM.find({});
      weekData[4] = thursdayM.find({});
      weekData[5] = fridayM.find({});
      weekData[6] = saturdayM.find({});
      const week = weekData[cur_week];
      // 指定日期
      const date = dateM.find({ date: todayStr });
      // 明天再说的内容
      const tomorrow = tomorrowM.find({});
      tomorrowM.remove({});

      // 连接起来
      todayData = todayData.concat(everyday);
      todayData = todayData.concat(random);
      todayData = todayData.concat(week);
      todayData = todayData.concat(date);
      todayData = todayData.concat(tomorrow);

      wx.setStorageSync('todayStr', todayStr);
      todayM.remove({});
      todayM.insertMulti(todayData);
      this.setData({ todayData: todayM.find({}) });
    }
  },

  /**
   * 完成task
   */
  finish: function(e) {
    const _this = this;

    _this.setData({ animation: e.currentTarget.dataset.id });
    
    setTimeout(function() {
      _this.setData({ animation: '' });
      todayM.remove({_id: e.currentTarget.dataset.id});
      const result = todayM.find({});
      _this.setData({todayData: result});
    }, 800);
  },

  /**
   * 显示菜单按钮
   */
  showMenu: function(e) {
    this.setData({ isShowMenu : true, curMenuId: e.currentTarget.dataset.id});
  },

  /**
   * 隐藏菜单按钮
   */
  hideMenu: function() {
    this.setData({ isShowMenu: false, curMenuId: null });
  },

  /**
   * "明天再说"按钮
   */
  addTomorrow: function() {
    const _this = this;

    // 把item从todayM中找出来
    const data = todayM.find({_id: _this.data.curMenuId})[0];

    // 把item从todayM中移除
    todayM.remove({ _id: _this.data.curMenuId});

    // 把item添加到tomorrowM中
    tomorrowM.insert({name: data.name});

    // show list
    _this.setData({
      todayData: todayM.find({}),
      isShowMenu: false,
      curMenuId: null
    });
  },

  /**
   * "放入随机"按钮
   */
  addRandom: function() {
    const _this = this;

    // 把item从todayM中找出来
    const data = todayM.find({ _id: _this.data.curMenuId })[0];

    // 把item从todayM中移除
    todayM.remove({ _id: _this.data.curMenuId });

    // 把item添加到tomorrowM中
    randomM.insert({ name: data.name });

    // show list
    _this.setData({
      todayData: todayM.find({}),
      isShowMenu: false,
      curMenuId: null
    });
  },

})