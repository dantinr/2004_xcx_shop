//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    name: 'zhangsan',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //点击登录
  btnLogin: function(e){

    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://shop.2004.com/wx/xcxlogin',
            data: {
              code: res.code
            },
            success:function(d)
            {
              //获取登录token
              console.log(33333333)
              wx.setStorage({
                key:"token",
                data:d.data.data.token
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  loginInfo:function(e)
  {
    let s = wx.getStorage({
      key: 'token',
      success(res){
        console.log(res.data)
      }
    })

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(this)
    let _this = this;


    //发起网络请求
    wx.request({
      url: 'http://shop.2004.com/api/test',
      data: {
        x: 'xxxx',
        y: 'yyyy'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(this)
          _this.setData({
            goods_name: res.data.goods_name,
            price: res.data.price
          })
      }
    })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      name2: 'zhangsan222'
    })
  }
})
