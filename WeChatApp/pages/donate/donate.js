const app = getApp()

// 主要修改onSubmit中内容即可，其他代码均为实现输入逻辑

Page({
  data:{
    lastTapIdx: -1,
    // 自定义输入中不允许提交，要点下别的地方
    flagBlockSubmit: false,
    // 如果自定义输入无效，会自动点到第一个选项，但如果用户自定义输入完后直接点了另一个选项，就不应该自动点击
    flagBlockNextAutoClick: false,
    // 捐献按钮的id 颜色等等，包括了自由输入框
    donateAmountElements:[
      { id: "donate_btn00", color: "tomato", bgColor: "whitesmoke", amount:1},
      { id: "donate_btn01", color: "tomato", bgColor: "whitesmoke", amount:5},
      { id: "donate_btn02", color: "tomato", bgColor: "whitesmoke", amount:10},
      { id: "donate_btn10", color: "tomato", bgColor: "whitesmoke", amount: 50},
      { id: "donate_btn11", color: "tomato", bgColor: "whitesmoke", amount: 100},
      { id: "donate_btn12", color: "tomato", bgColor: "whitesmoke", amount: 1000},
      { id: "donate_custom", color: "tomato", bgColor: "whitesmoke", amount: 0}
    ],
    // 自由输入框的值，是个字符串，需要在输入后转换成数字
    donateCustomValue: "",
    submitBtnColor: "white",
    submitBtnBGColor: "red",
  },

  // 获取当前选择的输入数额
  getCurrentValue: function(){
    return this.data.donateAmountElements[this.data.lastTapIdx].amount;
  },

  allowSubmit: function(){
    this.setData({
      submitBtnColor: "white",
      submitBtnBGColor: "red",
      flagBlockSubmit: false
    })
  },

  blockSubmit: function(){
    this.setData({
      submitBtnColor: "grey",
      submitBtnBGColor: "white",
      flagBlockSubmit:true
    })
  },

  onLoad: function (options) {
    // 登录相关
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    };
    // --------------------------

    // 默认点击第一个数额
    this.onTapDonateBtn(null);

    this.setData({
      donate_activity: options.activity,
      donateCustomValue: "其他数额"
    });
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onTapDonateBtn: function(options){
   var targetID = (options == null) ? this.data.donateAmountElements[0].id : options.target.id;
    var tappedIndex;
    for (tappedIndex = 0; tappedIndex < this.data.donateAmountElements.length; tappedIndex++){
      if (this.data.donateAmountElements[tappedIndex].id == targetID){
        if (tappedIndex == this.data.lastTapIdx){
          return;
        }
        this.data.donateAmountElements[tappedIndex].color = "white";
        this.data.donateAmountElements[tappedIndex].bgColor = "tomato"; 
        if (this.data.lastTapIdx>=0){
          this.data.donateAmountElements[this.data.lastTapIdx].color = "tomato";
          this.data.donateAmountElements[this.data.lastTapIdx].bgColor = "whitesmoke"; 
        }
        break;
      }
    }

    this.allowSubmit();
    this.setData({
      donateAmountElements: this.data.donateAmountElements,
      lastTapIdx: tappedIndex,
      flagBlockNextAutoClick: true
   })
  },

  onEditDonateCustom: function(options){
    this.blockSubmit();

    var tappedIndex;
    for (tappedIndex = 0; tappedIndex < this.data.donateAmountElements.length; tappedIndex++) {
      if (this.data.donateAmountElements[tappedIndex].id == options.target.id) {
        if (tappedIndex == this.data.lastTapIdx) {
          return;
        }
        this.data.donateAmountElements[tappedIndex].color = "white";
        this.data.donateAmountElements[tappedIndex].bgColor = "tomato";
        if (this.data.lastTapIdx >= 0) {
          this.data.donateAmountElements[this.data.lastTapIdx].color = "tomato";
          this.data.donateAmountElements[this.data.lastTapIdx].bgColor = "whitesmoke";
        }
        break;
      }
    }

    if ((options.detail.value == "其他数额") || (options.detail.value == "其他数额(整数)")){
      this.setData({
        donateCustomValue: "",
      })
    }

    this.setData({
      lastTapIdx: tappedIndex,
      donateAmountElements: this.data.donateAmountElements,
      flagBlockNextAutoClick: false
    })
  },

  onLeaveDonateCustom: function(options){
    this.allowSubmit();

    if (options.detail.value == "") {
      if (!this.data.flagBlockNextAutoClick) {
        this.onTapDonateBtn(null);
      }
      this.setData({
        donateCustomValue: "其他数额",
        flagCustomInputting: false
      });
      return;
    }
    else{
      var newValue = parseInt(options.detail.value, 10);
      // 如果不是数字，解析出来是NaN但不能用==判断
      if(isNaN(newValue)){
        if (!this.data.flagBlockNextAutoClick) {
          this.onTapDonateBtn(null);
        }
        this.setData({
          donateCustomValue: "其他数额(整数)",
          flagBlockNextAutoClick: false
        });
        return;
      }
      else{
        this.data.donateAmountElements[this.data.donateAmountElements.length-1].amount=newValue;
        this.setData({
          donateCustomValue: newValue.toString(),
          donateAmountElements: this.data.donateAmountElements,
          flagBlockNextAutoClick: false
        });
        return;
      }
    }
  },

  onDonateCustomInput: function(options){
    const acceptedInput = ["0","1","2","3","4","5","6","7","8","9","."]; 
    if (options.detail.value[options.detail.value.length-1] in acceptedInput){
    }
    else{
      options.detail.value = options.detail.value.substr(0,options.detail.value.length - 1);
      this.setData({
        donateCustomValue: options.detail.value
      })
    }
  },

  onSubmit: function(options){
    if (this.data.flagBlockSubmit){
      console.log("编辑中");
    }
    else{
      console.log(this.getCurrentValue());
    }
  }
})