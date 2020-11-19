//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: ['/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    list:[],
    page: 1,
    pagesize:10,
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(111111)
    this.data.page++;
    this.getGoodsList();
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

  //获取商品数据
  getGoodsList: function()
  {
    let _this = this;
    wx.request({
      url: 'http://shop.2004.com/api/goodslist',
      data:{
        page:_this.data.page,
        size:_this.data.pagesize
      },
      header:{'content-type': 'application/json'},
      success(res){
        let new_list = _this.data.list.concat(res.data.data.list)

        _this.setData({
          //list: res.data.data.list
          list: new_list
        })
      }
    })
  },

  //获取storage
  loginInfo:function(e)
  {
    wx.getSetting({
      success(res){
        console.log(res);
      }
    })
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

  //商品详情
  goodsDetail:function(e)
  {
    //获取被点击的 商品id
    let goods_id = e.currentTarget.dataset.goodsid;
    //切换至 详情页
    wx.redirectTo({
      url: '/pages/detail/detail?id='+goods_id
    });
  },

  onLoad: function () {
    this.getGoodsList();
  },

})
