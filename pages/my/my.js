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
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://shop.2004.com/wx/xcxlogin',
            data: {
              code: res.code
            },
            success : function(d)
            {
                console.log(d.data.data)
                //将 token 保存在 小程序端
              wx.setStorage({
                key:"token",
                data:d.data.data.token
              })

              let token = wx.getStorage({
                key: 'token',
                success(res){
                  console.log(res.data)
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
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
    console.log(111111);
    console.log(res);
    this.setData({
      user: res.detail.userInfo
    })
  }

})