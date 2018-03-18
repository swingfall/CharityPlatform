//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scrollTop: 0,
    floorstatus: false
  },

  // 滑动更新以及跳转顶部
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 25) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  getMore: function () {

  },

  onSearchSubmit: function(e){

  },

  onSearchInput: function(e){
    if (e.detail.value[e.detail.value.length-1] != '\n') {

    }
  },

  onSearchFocus: function(e){
    if (e.detail.value == "搜索项目") {
      this.setData({
        searchContent: ""
      });
    }
  },

  onSearchBlur: function (e) {
    if (e.detail.value.length == 0) {
      this.setData({
        searchContent: "搜索项目"
      });
    }
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      searchContent: "搜索项目"
    });

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
      hasUserInfo: true
    })
  }
})
