// pages/cart/cart.js
const app = getApp()
const apiHost = app.globalData.apiUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    goodsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车商品列表
    this.getCartList()
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

  getCartList: function()
  {
    let _this = this;
    wx.request({
      url: apiHost + '/api/cart-list',
      success: function(d)
      {
        _this.setData({goodsList:d.data.data.list})
      }
    })
  },

  /**
   * 全选
   */
  selectAll:function()
  {
    let _this = this;
    let isSelectAll = !_this.data.isSelectAll;

    //全选
    if(isSelectAll)
    {
      console.log("全选");

    }else{
      console.log("全不选")
    }

    _this.setData({
      isSelectAll:isSelectAll,
    })

  }
})