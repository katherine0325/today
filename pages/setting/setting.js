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
const todayM = new StorageDB('todays');
const tomorrowM = new StorageDB('tomorrows');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    everydays: [],
    randoms: [],
    tusedays: [],
    wendsdays: [],
    tursedays: [],
    fridays: [],
    saturdays: [],
    sundays: [],
    dates: [],
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
    return {
      title: '随时安排未来任务',
      path: '/pages/index/index'
    }
  },

  /**
   * 初始化数据
   */
  init: function() {
    const todays = todayM.find({});
    const tomorrows = tomorrowM.find({});
    const everydays = everydayM.find({});
    const randoms = randomM.find({});
    const mondays = mondayM.find({});
    const tuesdays = tuesdayM.find({});
    const wednesdays = wednesdayM.find({});
    const thursdays = thursdayM.find({});
    const fridays = fridayM.find({});
    const saturdays = saturdayM.find({});
    const sundays = sundayM.find({});
    const dates = dateM.find({});

    this.setData({
      todays,
      tomorrows,
      everydays,
      randoms,
      mondays,
      tuesdays,
      wednesdays,
      thursdays,
      fridays,
      saturdays,
      sundays,
      dates
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

    // const todayData = wx.getStorageSync('todayData') || [];
    // todayData.push({name: _this.data.create_context});
    // wx.setStorageSync('todayData', todayData);

    const result = todayM.insert({ name: _this.data.create_context });
    console.log(result);

    this.setData({create_context: ''});

    wx.showToast({
      title: '添加成功',
    })

    this.init();
  },

  /**
   * 删除 
   */
  delete: function (e) {
    const _this = this;

    wx.showModal({
      // title: '',
      content: '确定删除吗',
      success: function (res) {
        if (res.confirm) {
          const removeM = new StorageDB(e.currentTarget.dataset.collection);
          const result = removeM.remove({ _id: e.currentTarget.dataset.id });
          console.log(result);

          _this.init();
        }
      }
    })
  },
  
  // /**
  //  * 开始移动
  //  */
  // startMove(e) {
  //   var self = this;
  //   var pos = e.currentTarget.dataset.pos;
  //   var timer = setTimeout(() => {
  //     self.setData({
  //       showShadow: true
  //     });
  //     var cardFirst = e.currentTarget.dataset.card;
  //     let pageY = Number(e.touches[0].pageY);//初始点击的Y点坐标  
  //     let pageX = Number(e.touches[0].pageX);//初始点击的Y点坐标  

  //     if (pos == 'left') {
  //       var shadowStyle = 'left:0px';
  //     } else {
  //       shadowStyle = 'right:0px';
  //     }
  //     this.setData({
  //       pageY,
  //       pageX,
  //       shadowStyle,
  //       moveId: cardFirst.id,
  //       moveStyle: 'z-index:99999999;',
  //     });
  //   }, 500);
  //   console.log('timer=' + timer);
  //   this.setData({
  //     timer
  //   });
  // },

  // /**
  //  * 移动中
  //  */
  // onMove(e) {
  //   //用户没有触发拖拽
  //   if (!this.data.showShadow) {
  //     clearTimeout(this.data.timer);
  //     return;
  //   }
  //   let pageY = Number(e.touches[0].pageY);//初始点击的Y点坐标  
  //   let pageX = Number(e.touches[0].pageX);//初始点击的Y点坐标  
  //   this.setData({
  //     showShadow: true
  //   });
  //   this.setData({
  //     moveStyle: 'z-index:9999999;top:' + (pageY - this.data.pageY) + 'px;left:' + (pageX - this.data.pageX) + 'px;',
  //     left: pageX - this.data.pageX
  //   });
  // },

  // /**
  //  * 结束移动
  //  */
  // endMove(e) {
  //   //用户没有触发拖拽
  //   if (!this.data.showShadow) {
  //     return;
  //   }
  //   var self = this;
  //   var pos = e.currentTarget.dataset.pos;
  //   var cardFirst = e.currentTarget.dataset.card;
  //   //一级卡包
  //   if (cardFirst.second.length == 0) {
  //     var changeType = 0;
  //   }
  //   this.setData({
  //     showShadow: false
  //   });
  //   var windowWidth = wx.getSystemInfoSync().windowWidth;
  //   //向左拖拽
  //   if (this.data.left <= -windowWidth / 2 + 20) {
  //     var activate = true;
  //     if (changeType !== 0) {
  //       changeType = 2;
  //     }
  //   } else if (this.data.left >= windowWidth / 2 + 20) {
  //     activate = false;
  //     if (changeType !== 0) {
  //       changeType = 3;
  //     }
  //   } else {
  //     this.setData({
  //       moveStyle: ''
  //     });
  //     return;
  //   }

  //   // 启用之前检查是否解锁
  //   if (!cardFirst.purchased) {
  //     wx.showToast({
  //       icon: 'none',
  //       title: '本卡包需解锁后启用',
  //     })
  //     self.init();
  //     return;
  //   }

  //   wx.showLoading({});
  //   app.getSessionID(function (sessionID) {
  //     wx.request({
  //       url: self.data.baseUrl + '/package/activate_change',
  //       data: {
  //         sessionID: sessionID,
  //         packageName: cardFirst.packName,
  //         activated: activate,
  //         changeType
  //       },
  //       success: function (res) {
  //         self.init();
  //         if (res.data.code == 200) {
  //           var title = (activate ? '启用' : '停用') + '成功';
  //         } else {
  //           title = (activate ? '启用' : '停用') + '失败';
  //         }
  //         wx.showToast({
  //           title: title,
  //           icon: 'none', // loading
  //           duration: 1000,
  //           mask: false
  //         })
  //       }
  //     });
  //   });
  // },

  /**
   * 重载今日任务
   */
  reload: function() {
    wx.removeStorageSync('todayStr');
    // wx.removeStorageSync('isFirstTime');
    todayM.remove({});
    wx.showToast({
      title: '重载成功',
    })
  },

  /**
   * 转到反馈页面
   */
  goFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
})