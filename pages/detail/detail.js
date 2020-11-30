// pages/detail/detail.js
const app = getApp()
const apiHost = app.globalData.apiUrl
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
      url: apiHost + '/api/cart-add?token='+token,
      method:'POST',
      dataType: 'json',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data:{
        goodsid: goods_id
      },
      success:function(res)
      {
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  // 拨打电话
  makeCall:function()
  {
    wx.makePhoneCall({
      phoneNumber: '15010578121'
    })
  },

  switchToHome: function()
  {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  switchToCart: function()
  {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  //加入收藏
  addFav:function(e)
  {
    console.log(e)
    let goods_id = e.currentTarget.dataset.goodsid
    let token = wx.getStorageSync('token')
    wx.request({
      url: apiHost + '/api/add-fav?id=' + goods_id + '&token=' +token,
      success: function()
      {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }



})