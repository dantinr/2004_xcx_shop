// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    current:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _this = this;
    let goods_id = options.id;    //获取商品id
    let access_token = wx.getStorageSync('token')
    wx.request({
      url: app.globalData.apiUrl + "/api/goods",
      data:{
        id: goods_id,
        access_token: access_token
      },
      header: {'content-type':'application/json'},
      success(res){
        //console.log(res)
        _this.setData({
          goods: res.data.data.info,
        })
      }
    })
  },

  /**
   * 轮播图切换事件
   * @param e
   */
  swipperChange:function(e)
  {

    let current = e.detail.current;
    this.setData({
      current:e.detail.current
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

  //添加购物车
  addCart:function(data)
  {
    let goods_id = data.currentTarget.dataset.goodsid
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://shop.2004.com/api/add-cart?token='+token,
      method:'POST',
      dataType: 'json',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data:{
        goodsid: goods_id
      },
      sucess:function(res)
      {
        console.log(res)
      }
    })
  },

  // 拨打电话
  makeCall:function()
  {
    wx.makePhoneCall({
      phoneNumber: '15010578121'
    })
  }



})