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
    totalAmount:0
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

  /**
   * 获取购物车商品列表
   */
  getCartList: function()
  {
    let _this = this;
    let token = wx.getStorageSync('token')
    wx.request({
      url: apiHost + '/api/cart-list?token='+token,
      success: function(d)
      {

        if(d.data.errno==0)   //请求接口成功
        {
          _this.setData({
            goodsList:d.data.data.list
          })
        }else{
          console.log("接口请求错误")
        }

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
    let list = _this.data.goodsList;
    let total = 0;

    list.forEach((item)=>{
      if(isSelectAll)   //全选
      {
        item.checked = true;
        total += item.goods_num * item.cart_price
      }else{
        item.checked = false;
      }
    })

    _this.setData({
      goodsList:list,
      isSelectAll:isSelectAll,
      totalAmount:total
    })

  },

  //购物车单选
  selectGoods: function (e){
    let goods = e.detail.value    //获取checkbox中选中的value
    let list = this.data.goodsList    //获取当前页面中的商品列表
    let total = 0;

    list.forEach((item)=>{
      item.checked = false;
      goods.forEach((item2)=>{
        if(item.goods_id==item2){
          item.checked = true;      //记录选中状态
          total += item.cart_price * item.goods_num   //计算新的总价
        }
      })
    })

    let isSelectAll =  list.every(function(item){   //遍历商品列表 检查是否全部勾选
      return item.checked;
    })

    this.setData({
      totalAmount:total,
      isSelectAll:isSelectAll
    })

  },

  //删除商品
  delGoods: function(e)
  {
    let _this = this;
    let selectGoods = [];
    let list = _this.data.goodsList;
    let token = wx.getStorageSync('token')
    list.forEach(item=>{
      if(item.checked){   //选中的商品
        selectGoods.push(item.goods_id)
      }
    })

    if(selectGoods.length>0)
    {
      wx.showModal({
        title: '提示',
        content: '是否删除选中的商品？',
        success (res) {
          if (res.confirm) {
            console.log('删除商品')
            wx.request({
              url: apiHost + '/api/cart-del?token='+token, //仅为示例，并非真实的接口地址
              method: 'post',
              data: {
                goods: selectGoods.toString(),
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                console.log("删除成功")
                _this.getCartList();
                _this.setData({
                  isSelectAll:false,
                  totalAmount:0
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{    //未选中商品
      wx.showToast({
        title: '请先选择要删除的商品',
        icon: 'none',
        duration: 2000
      })
    }

  }



})