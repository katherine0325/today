// pages/feedback/feedback.js

const util = require('../../utils/util.js');
const config = require('../../config.js');
const Feedback = new wx.BaaS.TableObject(config.table_ids.feedback);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
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
   * 文本改变
   */
  changeText: function(e) {
    const _this = this;

    _this.setData({text: e.detail.value})
  },

  /**
   * 提交
   */
  submit: function() {
    const _this = this;

    if (_this.data.text) {
      let feedback = Feedback.create();
      feedback.set({ text: _this.data.text })
        .save()
        .then(res => {
          console.log('意见反馈提交')
          console.log(res)
          wx.showToast({
            title: '提交成功',
          })
        });
    }
  }
})