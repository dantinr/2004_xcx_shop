// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: wx.getStorageSync('user')
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

  /**
   * 获取用户信息
   */
  bindGetUserInfo: function(res)
  {
    //将用户信息保存在本地 storage
    console.log(res)
    let userinfo = res.detail.userInfo
    wx.setStorageSync('user', userinfo)

    let token = wx.getStorageSync('token')
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://shop.2004.com/api/user-login?code=' + res.code +'&token='+token,
            method: 'post',
            header:{'content-type':'application/json'},
            data: {
              u: userinfo
            },
            success: function(res){
              wx.setStorageSync('token',res.data.data.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    this.setData({
      user: res.detail.userInfo
    })
  },
  //跳转订单页面
  switchOrder:function()
  {
    wx.switchTab({
      url: '/pages/order/order',
    })
  }

})