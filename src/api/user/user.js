/**
 * 获取验证码
 */
export function getCode(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/get-code",
    params: {phone: obj.phone, type: obj.type}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.$message({
      showClose: true,
      type: 'success',
      message: "发送验证码成功"
    });
    obj.btnSendCodeTitle = "等待 45 秒";
    var secondsArea = 45;
    obj.intervalid = setInterval(() => {
      secondsArea--;
      obj.btnSendCodeTitle = "等待 " + secondsArea + " 秒";
      if (secondsArea == 0) {
        obj.btnSendCodeTitle = "发送验证码";
        clearInterval(obj.intervalid);
      }
    }, 1000);

  }, (response) => {
    // error callback
  });
}

//验证二维码
export function verification(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/verification",
    params: {
      phone: obj.phone,
      code: obj.code
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.$message({
      showClose: true,
      type: 'success',
      message: "验证成功"
    });

    obj.success();
  }, (response) => {
    // error callback
  });
}

//验证推荐人
export function getRecomUser(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/shop-item/get",
    params: {
      recommend: obj.recommend,
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }else{
    	obj.item.recommendId = response.data.recomUser.id;
    	obj.$message({
	      showClose: true,
	      type: 'success',
	      message: "验证成功"
	    });
    }
  }, (response) => {
    // error callback
  });
}

//验证二维码
export function verify(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/verification",
    params: {
      phone: obj.phone,
      code: obj.code
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }else{
    	obj.get();
    }

  }, (response) => {
    // error callback
  });
}


//export function getCode(obj) {
//obj.$axios({
//  method: 'post',
//  url: obj.adminApiUrl + "/user/get-code",
//  params: {phone: obj.phone}
//}).then((response) => {
//  // success callback
//  if (!response.data.success) {
//    obj.$message({
//      showClose: true,
//      type: 'warning',
//      message: response.data.info
//    });
//    return;
//  }
//  obj.btnSendCodeTitle = "等待 45 秒";
//  var secondsArea = 45;
//  obj.intervalid = setInterval(() => {
//    secondsArea--;
//    obj.btnSendCodeTitle = "等待 " + secondsArea + " 秒";
//    if (secondsArea == 0) {
//      obj.btnSendCodeTitle = "发送验证码";
//      clearInterval(obj.intervalid);
//    }
//  }, 1000);
//
//}, (response) => {
//  // error callback
//});
//}

export function userLogin(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/app-phone-login",
    params: {
      phone: obj.phone,
      code: obj.code,
      imageCode: obj.imageCode,
      userAgent: obj.userAgent
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: "success",
        message: "登陆成功!"
      });
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      if (obj.share == null) {
        if (obj.goDefaultUrl != undefined && obj.goDefaultUrl != null) {
          obj.$router.push({path: obj.goDefaultUrl});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      } else {
        if (obj.share.pageType == 0) {
          //商品详情分享  shareParams
          obj.$router.push({path: "/detailProduct/product/" + obj.share.shareParams});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
      obj.loginCount = obj.loginCount + 1;
    }
  })
}

export function userLoginV2(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/app-phone-loginV2",
    params: {
      phone: obj.phone,
      code: obj.code
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: "success",
        message: "登陆成功!"
      });
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      if (obj.share == null) {
        if (obj.goDefaultUrl != undefined && obj.goDefaultUrl != null) {
          obj.$router.push({path: obj.goDefaultUrl});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      } else {
        if (obj.share.pageType == 0) {
          //商品详情分享  shareParams
          obj.$router.push({path: "/detailProduct/product/" + obj.share.shareParams});
        } else {
          if (obj.goDefaultUrl != null) {
            if (obj.goDefaultUrl.indexOf("/hot") >= 0) {
              obj.$router.push({path: obj.goDefaultUrl});
            } else {
              obj.$router.push({path: "/footer/indexHead/index"});
            }
          } else {
            obj.$router.push({path: "/footer/indexHead/index"});
          }
        }

      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
      obj.loginCount = obj.loginCount + 1;
    }
  })
}

export function getShareInfo(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/product/get-proShare",
    params: {
      shareCode: obj.shareCode,
      shareSerial: obj.inviteCode
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.share = response.data.share;
      if (obj.share == null) {
        obj.$message({
          showClose: true,
          type: 'error',
          duration: 1000,
          message: "分享码异常"
        })
        return;
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
    }
  })
}

export function passwordLogin(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/app-password-login",
    params: {
      phone: obj.phone,
      password: obj.password,
      imageCode: obj.imageCode,
      userAgent: obj.userAgent
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: "success",
        message: "登陆成功!"
      });
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      if (obj.share == null) {
        if (obj.goDefaultUrl != undefined && obj.goDefaultUrl != null) {
          obj.$router.push({path: obj.goDefaultUrl});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      } else {
        if (obj.share.pageType == 0) {
          //商品详情分享  shareParams
          obj.$router.push({path: "/detailProduct/product/" + obj.share.shareParams});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
      obj.loginCount = obj.loginCount + 1;
    }
  })
}

export function passwordLoginV2(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/app-password-loginV2",
    params: {
      phone: obj.phone,
      password: obj.password
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: "success",
        message: "登陆成功!"
      });
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      if (obj.share == null) {
        if (obj.goDefaultUrl != undefined && obj.goDefaultUrl != null) {
          obj.$router.push({path: obj.goDefaultUrl});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      } else {
        if (obj.share.pageType == 0) {
          //商品详情分享  shareParams
          obj.$router.push({path: "/detailProduct/product/" + obj.share.shareParams});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
      obj.loginCount = obj.loginCount + 1;
    }
  })
}

export function getUserIndex(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/app-user-index"
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      obj.normalUserCount = response.data.normalUserCount;
      obj.messageCount = response.data.messageCount;
      obj.shopCount = response.data.shopCount;
    }
  })
}

export function getUser(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/app-user-index"
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      obj.normalUserCount = response.data.normalUserCount;
      obj.messageCount = response.data.messageCount;
      obj.shopCount = response.data.shopCount;
      obj.profit = response.data.profit;
      obj.amount = response.data.user.amount;
      obj.totalFaceGold = response.data.user.totalFaceGold;

      if(obj.totalIncome != undefined){
        obj.totalIncome = obj.user.shopIncome;
        if(obj.supplier != null || obj.supplier != undefined){
          obj.totalIncome = obj.totalIncome + obj.supplier.accountTotalBalance;
        }
      }
    }
  })
}

export function register(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/new-userV2",
    params: {
      inviteCode: obj.inviteCode,
      phone: obj.phone,
      code: obj.code,
      imgCode: obj.imageCode,
      userAgent: obj.userAgent,
      shareType: obj.shareType
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: "info",
        message: "注册成功!"
      });
      obj.flag = true;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      if (obj.share == null) {
        if (obj.goDefaultUrl != undefined && obj.goDefaultUrl != null) {
          obj.$router.push({path: obj.goDefaultUrl});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      } else {
        if (obj.share.pageType == 0) {
          //商品详情分享  shareParams
          obj.$router.push({path: "/detailProduct/product/" + obj.share.shareParams});
        } else if (obj.share.pageType == 4) {
          window.location.href = obj.adminUrl + '/share';
          //obj.$router.push({path:"/footer/indexHead/index"});
        } else if (obj.share.pageType == 7) {
          obj.$router.push({path: obj.goDefaultUrl});
          //window.location.href = obj.adminUrl+'/shoppingCard';
          //obj.$router.push({path:"/footer/indexHead/index"});
        }
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
      obj.regCount = obj.regCount + 1;
      obj.flag = true;
    }
  })
}

export function registerV2(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/new-user",
    params: {
      inviteCode: obj.inviteCode,
      phone: obj.phone,
      code: obj.code,
      shareType: obj.shareType
    }
  }).then((response) => {
    //success
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: "info",
        message: "注册成功!"
      });
      obj.flag = true;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      if (obj.share == null) {
        if (obj.goDefaultUrl != undefined && obj.goDefaultUrl != null) {
          obj.$router.push({path: obj.goDefaultUrl});
        } else {
          obj.$router.push({path: "/footer/indexHead/index"});
        }
      } else {
        if (obj.share.pageType == 0) {
          //商品详情分享  shareParams
          obj.$router.push({path: "/detailProduct/product/" + obj.share.shareParams});
        } else if (obj.share.pageType == 4) {
          //obj.$router.push({path:"/footer/indexHead/index"});
          window.location.href = obj.adminUrl + '/share';
        } else if (obj.share.pageType == 7) {
          obj.$router.push({path: obj.goDefaultUrl});
          //window.location.href = obj.adminUrl+'/shoppingCard';
          //obj.$router.push({path:"/footer/indexHead/index"});
        }
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'error',
        duration: 1000,
        message: response.data.info
      })
      obj.regCount = obj.regCount + 1;
      obj.flag = true;
    }
  })
}

export function modifyPhone(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/modify-phone",
    params: {
      phone: obj.phone,
      code: obj.code,
      flag: obj.flag,
      serial: obj.serial
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      obj.isDisable = false;
      return;
    }

    obj.$message({
      showClose: true,
      type: 'success',
      message: "手机号绑定成功"
    });

    var user = JSON.stringify(response.data.user);
    window.sessionStorage.setItem('user', user);
    obj.phone = "";
    obj.code = "";
    var isFirstBindFlag = response.data.isFirstBindFlag;
    if (isFirstBindFlag) {//如果是第一次绑定手机号，跳转充值脸金引导页面
      obj.$router.push("/invitationOK");

    } else {
      let redirect = decodeURIComponent(obj.$route.query.redirect || "/footer/indexHead/index");
      obj.$router.push({
        path: redirect
      })
    }

  }, (response) => {
    // error callback
  });
}

/**
 * 内部登录方法
 */
export function nativeLogin(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/native-login"
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.user = response.data.user;
    var user = JSON.stringify(response.data.user);
    window.sessionStorage.setItem('user', user);
    obj.store = response.data.store;
    obj.loadOther();
    obj.hasCofferRecord = response.data.hasCofferRecord;
    obj.hasCouponRecord = response.data.hasCouponRecord;
  }, (response) => {
    // error callback
  });
}


export function modStoreInfo(obj) {
  obj.$http.post(obj.adminApiUrl + "/user/mod-storeInfo",
    {
      storeName: obj.user.storeName,
      storeRemark: obj.user.storeRemark,
      storeShareTitle: obj.user.storeShareTitle,
      storeShareContent: obj.user.storeShareContent
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: 'success',
        message: "更改成功"
      });
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      obj.$router.go(-1);
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }

  }, (response) => {
    // error callback
  });
}

export function modNickName(obj) {
  obj.$http.post(obj.adminApiUrl + "/user/mod-nickName",
    {
      nickName: obj.user.nickname
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: 'success',
        message: "更改成功"
      });
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      let redirect = decodeURIComponent(obj.$route.query.redirect || "/userInfo");
      obj.$router.push({
        path: redirect
      })
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }

  }, (response) => {
    // error callback
  });
}

export function modName(obj) {
  obj.$http.post(obj.adminApiUrl + "/user/mod-name",
    {
      name: obj.user.name
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: 'success',
        message: "更改成功"
      });
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
      let redirect = decodeURIComponent(obj.$route.query.redirect || "/userInfo");
      obj.$router.push({
        path: redirect
      })
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }

  }, (response) => {
    // error callback
  });
}

/*
 * 保存用户信息
 */
export function update(obj) {
  var birthdayTime = FormatDate(obj.user.birthdayTime);
  obj.$http.post(obj.adminApiUrl + "/user/mod-userInfo",
    {
      pic: obj.user.pic,
      sex: obj.user.sex,
      birthdayTime: birthdayTime,
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: 'success',
        message: "修改成功"
      });
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.$router.push("/setUp");
  }, (response) => {
    // error callback
  });
}

/*
 * 日期转字符串
 */
function FormatDate(time) {
  if (time != null && time != '') {
    var date = new Date(time);
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var timeStr = date.getFullYear() + "-" + month + "-" + day;
    return timeStr;
  }
  return null;
}

export function changeParentStore(obj) {
  obj.$http.post(obj.adminApiUrl + "/user/change-parent",
    {
      storeId: obj.storeId,
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }

  }, (response) => {
    // error callback
  });
}

/**
 * 获取身份验证的验证码
 */
export function getValidateCode(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/getValidateCode",
    params: {phone: obj.user.phone}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.btnSendCodeTitle = "等待 45 秒";
    var secondsArea = 45;
    obj.intervalid = setInterval(() => {
      secondsArea--;
      obj.btnSendCodeTitle = "等待 " + secondsArea + " 秒";
      if (secondsArea == 0) {
        obj.btnSendCodeTitle = "发送验证码";
        clearInterval(obj.intervalid);
      }
    }, 1000);

  }, (response) => {
    // error callback
  });
}

/**
 * 进行身份验证
 */
export function validateCode(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/validate-code",
    params: {
      phone: obj.user.phone,
      code: obj.code
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    let redirect = decodeURIComponent(obj.$route.query.redirect || "/setPaymentPasswordTwo");
    obj.$router.push({
      path: redirect
    })
  }, (response) => {
    // error callback
  });
}

/**
 * 设置支付密码
 */
export function savePayPwd(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/save-payPassword",
    params: {payPwd: obj.payPwd}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    var user = JSON.stringify(response.data.user);
    window.sessionStorage.setItem('user', user);
    let redirect = decodeURIComponent(obj.$route.query.redirect || "/setPaymentPasswordThree");
    obj.$router.push({
      path: redirect
    })
  }, (response) => {
    // error callback
  });
}

/**
 * 升级店铺
 */
export function upGradeShop(obj, level) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/upgrade-Shop",
    params: {level: level}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.$message({
      type: 'success',
      message: "店铺升级成功"
    });
    obj.user = response.data.user;
  }, (response) => {
    // error callback
  });
}

/**
 * 我的会员
 */
export function listMyMembers(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/list",
    params: {
      start: obj.start,
      length: obj.length,
      nickname: obj.serachKeyWord
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.list = response.data.list;
    obj.loading = false;
    obj.hasNextPage = response.data.hasNextPage;
    obj.memberCount = response.data.memberCount;
  }, (response) => {
    // error callback
  });
}

/**
 * 我的会员
 */
export function listMyMembersPage(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/list",
    params: {start: obj.start, length: obj.length, nickname: obj.serachKeyWord}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    response.data.list.forEach(data => {
      obj.list.push(data);
    });
    obj.loading = false;
    obj.hasNextPage = response.data.hasNextPage;
    obj.memberCount = response.data.memberCount;
  }, (response) => {
    // error callback
  });
}

/*
 * 点击店铺链接，用户的storeId变为自己
 */
export function updateStoreId(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/update-storeId",
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    var user = JSON.stringify(response.data.user);
    window.sessionStorage.setItem('user', user);
    obj.$store.commit('clearPosition', '/footer/indexHead/index') //离开路由时把位置存起来
    let redirect = decodeURIComponent(obj.$route.query.redirect || '/footer/indexHead/index');
    obj.$router.push({
      path: redirect
    })
  }, (response) => {
    // error callback
  });
}

export function getStore(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/store/get-store"
  }).then((response) => {
    // success callback
    obj.user = response.data.store;
    obj.sharelink = obj.qrcodeUrl + "/#otherQRcode?shareId=" + obj.user.id;

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isiOS) {
      obj.loadOther();
    } else {
      $("#loadOther").click();
    }
  }, (response) => {
    // error callback
  });
}

export function listVistitRecord(obj) {
  obj.$http.post(obj.adminApiUrl + "/user/list-visitRecord",
    {
      visitId: obj.visitId,
      length: obj.length,
      start: obj.start
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      obj.list = response.data.list;
      obj.hasNextPage = response.data.hasNextPage;
      obj.visitUser = response.data.visitUser;
      obj.onload();
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

export function loadListVistitRecord(obj) {
  obj.$http.post(obj.adminApiUrl + "/user/list-visitRecord",
    {
      visitId: obj.visitId,
      length: obj.length,
      start: obj.start
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      response.data.list.forEach(data => {
        obj.list.push(data);
      });
      obj.hasNextPage = response.data.hasNextPage;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
    obj.loading = false;
  }, (response) => {
    // error callback
  });
}

export function getPicDate(obj) {
  obj.$http.post(obj.adminApiUrl + "/params/app-reg-optimization",
    {emulateJSON: true}).then((response) => {
    // success callback
    if (response.data.success) {
      console.log(response.data.invitePic + "~~~~~~~~~~~~~");
      obj.invitePic = response.data.invitePic;
      obj.versionb = response.data.android;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
    obj.loading = false;
  }, (response) => {
    // error callback
  });
}


export function getInvitePic(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/params/get-invite-pic"
  }).then((response) => {
    // success callback
    obj.invitePic = response.data.invitePic;
    obj.versionb = response.data.android;

  }, (response) => {
    // error callback
  });
}

export function getSerialByShareCode(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/get-serial",
    params: {shareCode: obj.shareCode}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.share = response.data.share;
    obj.inviteCode = response.data.share.userSerial;
  }, (response) => {
    // error callback
  });
}

/**
 * 收益列表
 */
export function listIncome(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/balance/list",
    params: {
      start: obj.start,
      length: obj.length,
      incomeType: obj.incomeType,
      type: obj.type
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.list = response.data.list;
    obj.hasNextPage = response.data.hasNextPage;
  }, (response) => {
    // error callback
  });
}
/**
 * 收益列表
 */
export function carIncome(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/balance/car-list",
    params: {
      start: obj.start,
      length: obj.length,
      incomeType: obj.incomeType,
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.list = response.data.list;
    obj.hasNextPage = response.data.hasNextPage;
  }, (response) => {
    // error callback
  });
}

/**
 * 收益列表
 */
export function carIncomePage(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/balance/car-list",
    params: {
      start: obj.start,
      length: obj.length,
      incomeType: obj.incomeType,
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    response.data.list.forEach(data => {
      obj.list.push(data);
    })
    obj.hasNextPage = response.data.hasNextPage;
    obj.loading = false;
  }, (response) => {
    // error callback
  });
}
/**
 * 收益列表
 */
export function listIncomePage(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/balance/list",
    params: {
      start: obj.start,
      length: obj.length,
      incomeType: obj.incomeType,
      type: obj.type
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    response.data.list.forEach(data => {
      obj.list.push(data);
    })
    obj.hasNextPage = response.data.hasNextPage;
    obj.loading = false;
  }, (response) => {
    // error callback
  });
}

/**
 * 实名认证
 */
export function goAuthentication(obj) {
  obj.flag = 1;
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/idCard/review",
    params: {
      idCard: obj.cardNumber,
      name: obj.linkMan,
      cardType: obj.value,
      frontPic: obj.pic1,
      adminPic: obj.pic2,
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      obj.flag = 0;
      return;
    }
    obj.$message({
      type: 'success',
      message: "提交认证成功"
    });
    let redirect = decodeURIComponent(obj.$route.query.redirect || "/setUp");
    obj.$router.push({
      path: redirect
    })
  }, (response) => {
    // error callback
  });
}

/**
 * 银行卡集合
 */
export function myBankCard(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/bank/list-bank",
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.list = response.data.list;
  }, (response) => {
    // error callback
  });
}

/**
 * 绑定银行卡
 */
export function addBankCard(obj) {
  obj.fale = 1;
  // obj.withdrawlType,
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/bank/save-bank",
    params: {
      bankUser: obj.bankUser,
      bankNumber: obj.bankNumber,
      bankName: obj.bankName,
      bankAddress: obj.bankAddress,
      province: obj.province,
      city: obj.city,
      area: obj.city,
      isDef: obj.isDef,
     
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      obj.fale = 0;
      return;
    }
    if(obj.withdrawlType == undefined){
      obj.$router.push("/myBankCard"); 
    }else{
      obj.$router.push("/myBankCard?withdrawlType="+ obj.withdrawlType);
    }
    
  }, (response) => {
    // error callback
  });
}

/**
 * 编辑银行卡
 */
export function modifyBankCard(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/bank/save-bank",
    params: {
      bankUser: obj.bankUser,
      bankNumber: obj.bankNumber,
      bankName: obj.bankName,
      bankAddress: obj.bankAddress,
      province: obj.province,
      city: obj.city,
      area: obj.city,
      isDef: obj.isDef,
      id: obj.id,
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.$router.push("/myBankCard");
  }, (response) => {
    // error callback
  });
}

/**
 * 解绑银行卡
 */
export function delBankCard(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/bank/del-bank",
    params: {
      bankId: obj.bankId,
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    myBankCard(obj);
  }, (response) => {
    // error callback
  });
}

/**
 * 银行卡详情
 */
export function detailBankCard(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/bank/detail",
    params: {
      bankId: obj.id,
    }
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.bankUser = response.data.userBank.bankUser;
    obj.bankNumber = response.data.userBank.bankNumber;
    obj.bankName = response.data.userBank.bankName;
    obj.bankAddress = response.data.userBank.bankAddress;
    obj.province = response.data.userBank.province;
    obj.city = response.data.userBank.city;
    obj.area = response.data.userBank.area;
    obj.isDef = response.data.userBank.isDef;
    obj.showAddr = obj.province + "," + obj.city + "," + obj.area;
  }, (response) => {
    // error callback
  });
}

/**
 * 客服
 */
export function getKf(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/get-kf",
  }).then((response) => {
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }
    obj.params = response.data.params;
  }, (response) => {
    // error callback
  });
}

/**
 * 设置登陆密码
 */
export function saveLoginPwd(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/mod-pay-password",
    params: {
      newPassword: obj.password,
      code: obj.code,
      phone: obj.user.phone,
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      obj.isDisable = false;
      return;
    }
    obj.$message({
      showClose: true,
      type: "success",
      message: "修改成功!"
    });
    var user = JSON.stringify(response.data.user);
    window.sessionStorage.setItem('user', user);
    if (obj.type == 1) {
      obj.$router.push("/myFacegold");
    } else {
      obj.$router.push("/setUp");
    }
  }, (response) => {
    // error callback
  });
}

//根据邀请码获取用户 - 加弹窗
export function getName(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/get-name",
    params: {
      serial: obj.serial,
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.parentUser = data.parentUser;
      obj.parent = data.parent;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

//根据邀请码获取用户
export function getUserName(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/get-name",
    params: {
      serial: obj.serial,
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.parentUser = data.parentUser;
      obj.parent = data.parent;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

//根据实名信息
export function getInfo(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/idCard/info",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.user = data.user;
      obj.idCardReviewed = data.idCardReviewed;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

//根据实名信息
export function get(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/idCard/info",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.linkMan = data.idCardReviewed.name;
      obj.cardNumber = data.idCardReviewed.idCard;
      obj.picList[0] = data.idCardReviewed.frontPicStr;
      obj.picList[1] = data.idCardReviewed.adminPicStr;
      obj.pic1 = data.idCardReviewed.frontPic;
      obj.pic2 = data.idCardReviewed.adminPic;
      obj.value = data.idCardReviewed.cardType;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*------------------------------------------- 脸金转赠 - 获取脸金转赠说明 ----------------------------------------*/

export function getFaceGoldInfo(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/face-gold/get-info",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.explain = data.explain;
      obj.upper = data.upper;
      obj.lower = data.lower;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*------------------------------------------- 脸金转赠 - 提交脸金转赠 ----------------------------------------*/

export function sendFaceGold(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/face-gold/send",
    params: {
      faceGold: obj.faceGold,
      serial: obj.serial,
      phone: obj.phone,
      code: obj.code,
      type: obj.type,
      payPassword: obj.payPassword,
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: 'success',
        message: "转赠成功"
      });

      //转赠后，更新session中的user
      var data = response.data;
      window.sessionStorage.setItem("user", JSON.stringify(data.user));
      //进入脸金转赠列表
      obj.$router.push("/faceGoldSendList");
      setTimeout(function(){
        $("#tcShow").show();
        $('.tc-div').show();
      },500)
     
      
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}


/*------------------------------------------- 获取脸金转赠列表 ----------------------------------------*/

export function getListSend(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/face-gold/list-send",
    params: {
      pageNo: obj.page.pageNo,
      pageSize: obj.page.pageSize,
      incomeType: obj.incomeType
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      //返回数据
      var data = response.data;
      obj.list = data.list;
      obj.page.hasNextPage = data.hasNextPage;

      obj.sendFaceGold = data.sendFaceGold;
      obj.gainFaceGold = data.gainFaceGold;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*-------------------------- 加载下一页 - 获取脸金转赠列表 ---------------------------*/

export function loadMoreListSend(obj) {
  obj.$http.post(obj.calcApiUrl + "/face-gold/list-send", {
      pageNo: obj.page.pageNo,
      pageSize: obj.page.pageSize,
      incomeType: obj.incomeType
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    obj.page.loading = false;
    var data = response.data;
    if (data.success) {
      //设置列表数据
      data.list.forEach(data => {
        obj.list.push(data);
      });
      //是否还有下一页
      obj.page.hasNextPage = data.hasNextPage;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*------------------------------------------- 获取 - 分门店脸金列表 ----------------------------------------*/

export function getListFaceGoldShop(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/face-gold/list-shop",
    params: {
      pageNo: obj.page.pageNo,
      pageSize: obj.page.pageSize
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      //返回数据
      var data = response.data;
      obj.list = data.list;
      obj.page.hasNextPage = data.hasNextPage;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*-------------------------- 加载下一页 - 获取脸金转赠列表 ---------------------------*/

export function loadMoreListFaceGoldShop(obj) {
  obj.$http.post(obj.calcApiUrl + "/face-gold/list-shop", {
      pageNo: obj.page.pageNo,
      pageSize: obj.page.pageSize
    },
    {emulateJSON: true}).then((response) => {
    // success callback
    obj.page.loading = false;
    var data = response.data;
    if (data.success) {
      //设置列表数据
      data.list.forEach(data => {
        obj.list.push(data);
      });
      //是否还有下一页
      obj.page.hasNextPage = data.hasNextPage;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*-------------------------- 获取 - 可用脸金、我的脸金、门店脸金、脸金说明 ---------------------------*/

export function getFaceGold(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/get-face-gold",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.faceGold = data.faceGold; //脸金
      obj.faceGoldCredit = data.faceGoldCredit; //脸金额度
      obj.faceGoldShop = data.faceGoldShop;     //门店脸金
      obj.effectFaceGold = data.effectFaceGold; //可用脸金
      obj.totalFaceGold = data.totalFaceGold;   //我的脸金
      obj.list = data.list;                     //脸金说明
      var user = JSON.stringify(data.user);
      window.sessionStorage.setItem('user', user);
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*-------------------------- 获取 - 总屏主脸金额度（已领取）、总额度、脸金说明  ---------------------------*/

export function getTotalCredit(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/get-total-credit",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.totalFaceGoldCredit = data.totalFaceGoldCredit;
      obj.totalCredit = data.totalCredit;//总额度
      obj.useFaceGoldCredit = data.useFaceGoldCredit;//屏主脸金额度 - 已用额度
      obj.masterFaceGoldCredit = data.masterFaceGoldCredit;//屏主脸金额度
      obj.list = data.list;//总额度

    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*-------------------------- 添加 - 脸金分配 - 弹窗次数 ---------------------------*/

export function addPop(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/user/add-pop",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*-------------------------- 获取 - 脸金充值说明、脸金充值参数 ---------------------------*/

export function getGoldAdd(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/get-gold-add",
    params: {
      shopId: obj.shopId
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.list = data.list;
      obj.explain = data.explain;
      obj.depositParamId = obj.list[0] != undefined ? obj.list[0].id : 0;
      obj.faceGoldShop = data.faceGoldShop;
      obj.shop = data.shop;
      if(obj.list.length > 0){
          obj.money = obj.list[0].giveFaceAmount;
          obj.mount = obj.list[0].depositMoney;
      }
      
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}


export function getFinance(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/finance/get",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.finance = data.finance;
      obj.state = data.finance.state;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*------------------------------- 获取 - 待领取收益列表 ---------------------------*/

export function getProfits(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/list-profit",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      //返回数据
      var data = response.data;
      obj.list = data.list;
      obj.totalProfit = data.totalProfit;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

//增加弹框次数
export function add(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/add",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {

    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

export function details(obj) {
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/supply/info",
    params: {}
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.supplier = data.supplier;
      obj.totalIncome = obj.user.shopIncome;
      if(data.supplier != null || data.supplier != undefined){
        obj.totalIncome = obj.totalIncome + data.supplier.accountTotalBalance
      }
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

//开启关闭免密支付
export function modify(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/user/modify",
    params: {
      isPay: obj.isPay
    }
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }

  }, (response) => {
    // error callback
  });
}

//获取免密支付参数
export function getParams(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/params/get-agreement",
    params: {
      type: 3,
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.params = data.params;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*------------------------------- 获取参数 - 成为vip会员 ---------------------------*/

export function getParam(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/params/be-vip",
    params: {}
  }).then((response) => {
    // success callback
    if (!response.data.success) {
      obj.$message({
        type: 'warning',
        message: response.data.info
      });
      return;
    }

    //返回数据
    var data = response.data;
    obj.faceGold = data.faceGold;

  }, (response) => {
    // error callback
  });
}

/*------------------------------- 获取参数 - 获取免密支付参数 ---------------------------*/
export function getfaceParams(obj) {
  obj.$axios({
    method: 'post',
    url: obj.calcApiUrl + "/params/get-agreement",
    params: {
      type: 4,
    }
  }).then((response) => {
    // success callback
    if (response.data.success) {
      var data = response.data;
      obj.params = data.params;
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
    }
  }, (response) => {
    // error callback
  });
}

/*------------------------------- 保存 - 人脸录入照片 ---------------------------*/
export function modifyPic(formData, obj) {
  // var birthdayTime = FormatDate(obj.user.birthdayTime);
  obj.$axios({
    method: 'post',
    url: obj.adminApiUrl + "/face-aip/modify-face-pic",
    data: formData,
 }).then((response) => {
    // success callback
    if (response.data.success) {
      obj.$message({
        showClose: true,
        type: 'success',
        message: "录入成功"
      });
      obj.user = response.data.user;
      var user = JSON.stringify(response.data.user);
      window.sessionStorage.setItem('user', user);
    } else {
      obj.$message({
        showClose: true,
        type: 'warning',
        message: response.data.info
      });
      return;
    }
  }, (response) => {
    // error callback
  });
}
