/* eslint-disable */
function detectOS () {
  var sUserAgent = navigator.userAgent
  var isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows'
  var isMac =
        navigator.platform == 'Mac68K' ||
        navigator.platform == 'MacPPC' ||
        navigator.platform == 'Macintosh' ||
        navigator.platform == 'MacIntel'
  if (isMac) return 'MacOS'
  var isUnix = navigator.platform == 'X11' && !isWin && !isMac
  if (isUnix) return 'Unix'
  var isLinux = String(navigator.platform).indexOf('Linux') > -1
  if (isLinux) return 'Linux'
  if (isWin) {
    var isWin2K =
            sUserAgent.indexOf('Windows NT 5.0') > -1 ||
            sUserAgent.indexOf('Windows 2000') > -1
    if (isWin2K) return 'Windows2000'
    var isWinXP =
            sUserAgent.indexOf('Windows NT 5.1') > -1 ||
            sUserAgent.indexOf('Windows XP') > -1
    if (isWinXP) return 'WindowsXP'
    var isWin2003 =
            sUserAgent.indexOf('Windows NT 5.2') > -1 ||
            sUserAgent.indexOf('Windows 2003') > -1
    if (isWin2003) return 'Windows2003'
    var isWinVista =
            sUserAgent.indexOf('Windows NT 6.0') > -1 ||
            sUserAgent.indexOf('Windows Vista') > -1
    if (isWinVista) return 'Windows Vista'
    var isWin7 =
            sUserAgent.indexOf('Windows NT 6.1') > -1 ||
            sUserAgent.indexOf('Windows 7') > -1
    if (isWin7) return 'Windows7'
    var isWin10 =
            sUserAgent.indexOf('Windows NT 10.0') > -1 ||
            sUserAgent.indexOf('Windows 10') > -1
    if (isWin10) return 'Windows 10'
  }
  return 'Other'
}
// document.writeln("您的操作系统是：" + detectOS());

function bro (StrUrl) {
  var ComputerHost = null
  var RTCPeerConnection =
    /* window.RTCPeerConnection || */ window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection

  if (RTCPeerConnection) {
    (function () {
      var rtc = new RTCPeerConnection({ iceServers: [] })
      if (1 || window.mozRTCPeerConnection) {
        // FF [and now Chrome!] needs a channel/stream to proceed
        rtc.createDataChannel('', { reliable: false })
      }

      rtc.onicecandidate = function (evt) {
        // convert the candidate to SDP so we can run it through our general parser
        // see https://twitter.com/lancestout/status/525796175425720320 for details
        if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
      }
      rtc.createOffer(
        function (offerDesc) {
          grepSDP(offerDesc.sdp)
          rtc.setLocalDescription(offerDesc)
        },
        function (e) {
          console.warn('offer failed', e)
        }
      )

      var addrs = Object.create(null)
      addrs['0.0.0.0'] = false
      function updateDisplay (newAddr) {
        if (newAddr in addrs) return
        else addrs[newAddr] = true
        var displayAddrs = Object.keys(addrs).filter(function (k) {
          return addrs[k]
        })
        ComputerHost = displayAddrs.join(' or perhaps ') || 'n/a'
      }

      function grepSDP (sdp) {
        var hosts = []
        sdp.split('\r\n').forEach(function (line) {
          // c.f. http://tools.ietf.org/html/rfc4566#page-39
          if (~line.indexOf('a=candidate')) {
            // http://tools.ietf.org/html/rfc4566#section-5.13
            var parts = line.split(' ') // http://tools.ietf.org/html/rfc5245#section-15.1
            var addr = parts[4]
            var type = parts[7]
            if (type === 'host') updateDisplay(addr)
          } else if (~line.indexOf('c=')) {
            // http://tools.ietf.org/html/rfc4566#section-5.7
            var parts = line.split(' ')
            var addr = parts[2]
            updateDisplay(addr)
          }
        })
      }
    })()
  } else {
    // document.getElementById('list').innerHTML = "<code>ifconfig | grep inet | grep -v inet6 | cut -d\" \" -f2 | tail -n1</code>";
    // document.getElementById('list').nextSibling.textContent = "In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.";
  }

  var is360 = false
  var isIE = false
  var isFirefox = false
  var isChrome = false
  var isEdge = false
  var broName = 'Runing'
  var str = ''
  var strStart = 0
  var strStop = 0
  var strStart10 = ''
  var arr = new Array()
  var temp = ''
  var temp1 = ''
  var broName1 = ''
  var broName2 = ''
  var broName1 = ''
  var userAgent = window.navigator.userAgent // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

  // Edge
  if (userAgent.indexOf('Edge') != -1) {
    isEdge = true
    /* broName = 'Edge浏览器'; */
    strStart = userAgent.indexOf('Edge')
    temp = userAgent.substring(strStart)
    broName = temp.replace('/', '版本号')
    strStart10 = 'Edge'
    strStart1 = userAgent.indexOf(';')
    strStop1 = userAgent.indexOf(')')
    temp1 = userAgent.substring(strStart1, strStop1)
    broName1 = temp1.substring(8) // temp1.replace('; Win64; ', '');
    // 客户端的操作系统版本  broName1
    broName2 = temp1.substring(1, 7)
    // 客户端的操作系统  broName2
  }

  // FireFox
  if (userAgent.indexOf('Firefox') != -1) {
    isFireFox = true
    /* broName = 'FireFox浏览器'; */
    strStart = userAgent.indexOf('Firefox')
    strStart10 = 'Firefox'
    temp = userAgent.substring(strStart)
    broName = temp.replace('/', '版本号')
    strStart10 = 'Firefox'
    strStart1 = userAgent.indexOf(';')
    strStop1 = userAgent.indexOf(')')
    temp1 = userAgent.substring(strStart1, strStop1)
    broName1 = temp1.substring(8) // temp1.replace('; Win64; ', '');
    // 客户端的操作系统版本  broName1
    broName2 = temp1.substring(1, 7)
    // 客户端的操作系统  broName2
  }

  // IE浏览器
  if (userAgent.indexOf('NET') != -1 && userAgent.indexOf('rv') != -1) {
    isIE = true
    /* broName = 'IE浏览器'; */
    strStart = userAgent.indexOf('rv')
    strStop = userAgent.indexOf(')')
    temp = userAgent.substring(strStart, strStop)
    broName = temp.replace('rv', 'IE').replace(':', '版本号')
    strStart10 = 'Internet Explorer'
    strStart1 = userAgent.indexOf(';')
    strStop1 = userAgent.indexOf(')')
    temp1 = userAgent.substring(strStart1, strStop1)
    broName1 = temp1.substring(8) // temp1.replace('; Win64; ', '');
    // 客户端的操作系统版本  broName1
    broName2 = temp1.substring(1, 7)
    // 客户端的操作系统  broName2
  }

  // 360极速模式可以区分360安全浏览器和360极速浏览器
  if (
    userAgent.indexOf('WOW') != -1 &&
        userAgent.indexOf('NET') < 0 &&
        userAgent.indexOf('Firefox') < 0
  ) {
    if (navigator.javaEnabled()) {
      is360 = true
      broName = '360安全浏览器-极速模式'
    } else {
      is360 = true
      broName = '360极速浏览器-极速模式'
    }
  }

  // 360兼容
  if (
    userAgent.indexOf('WOW') != -1 &&
        userAgent.indexOf('NET') != -1 &&
        userAgent.indexOf('MSIE') != -1 &&
        userAgent.indexOf('rv') < 0
  ) {
    is360 = true
    broName = '360兼容模式'
  }

  // Chrome浏览器
  if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf('Edge') < 0) {
    isChrome = true
    /* broName = 'Chrome浏览器'; */
    strStart = userAgent.indexOf('Chrome')
    strStart10 = 'Chrome'
    strStop = userAgent.indexOf(' Safari')
    temp = userAgent.substring(strStart, strStop)
    broName = temp.replace('/', '版本号')
    // 版本号：broName = temp.replace('Chrome/', '');
    // 浏览器类型 :strStart

    strStart1 = userAgent.indexOf(';')
    strStop1 = userAgent.indexOf(')')
    temp1 = userAgent.substring(strStart1, strStop1)
    broName1 = temp1.substring(8) // temp1.replace('; Win64; ', '');
    // 客户端的操作系统版本  broName1
    broName2 = temp1.substring(1, 7)
    // 客户端的操作系统  broName2
  }
  // document.getElementById('broType').value = broName;

  layui.use('form', function () {
    var form = layui.form
    document.onkeydown = function (e) {
      var ev = document.all ? window.event : e
      if (ev.keyCode == 13) {
        BtnClick()
      }
    }

    $('#BtnLogin').click(function () {
      BtnClick()
    })
    function BtnClick () {
      // form.on('submit(formDemo)', function (data) {
      var UserName = $('#AccountNumber').val()
      var UserPass = $('#InputPass').val()
      if (UserName != '' && UserPass != '') {
        var AccountNumber = UserName
        var MD5Pass = hex_md5(UserPass)
        var Platform = detectOS()
        layer.msg('正在检测网络连接...')
        // onLine(function (flag) {//判断网络是否畅通
        var RTCPeerConnection =
                    window.RTCPeerConnection ||
                    window.webkitRTCPeerConnection ||
                    window.mozRTCPeerConnection
        if (RTCPeerConnection) {
          (function () {
            var rtc = new RTCPeerConnection({ iceServers: [] })
            if (1 || window.mozRTCPeerConnection) {
              rtc.createDataChannel('', { reliable: false })
            }
            rtc.onicecandidate = function (evt) {
              if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
            }
            rtc.createOffer(
              function (offerDesc) {
                grepSDP(offerDesc.sdp)
                rtc.setLocalDescription(offerDesc)
              },
              function (e) {
                console.warn('offer failed', e)
              }
            )
            var addrs = Object.create(null)
            addrs['0.0.0.0'] = false
            function updateDisplay (newAddr) {
              if (newAddr in addrs) return
              else addrs[newAddr] = true
              var displayAddrs = Object.keys(addrs).filter(function (k) {
                return addrs[k]
              })
              for (var i = 0; i < displayAddrs.length; i++) {
                if (displayAddrs[i].length > 16) {
                  displayAddrs.splice(i, 1)
                  i--
                }
              }
              GainIP(displayAddrs[0]) // 打印出内网ip
            }
            function grepSDP (sdp) {
              var hosts = []
              sdp.split('\r\n').forEach(function (line, index, arr) {
                if (~line.indexOf('a=candidate')) {
                  var parts = line.split(' ')
                  var addr = parts[4]
                  var type = parts[7]
                  if (type === 'host') updateDisplay(addr)
                } else if (~line.indexOf('c=')) {
                  var parts = line.split(' ')
                  var addr = parts[2]
                  updateDisplay(addr)
                }
              })
            }
          })()
        } else {
          layer.msg('请使用主流浏览器：chrome,firefox,opera,safari')
        }

        function GainIP (WithinIP) {
          var datas
          for (var i = 0; i < 100; i++) {
            setTimeout(function () {
              try {
                if (returnCitySN == null || returnCitySN == '') {
                  i = 100
                }
              } catch (e) { }
            }, (i + 1) * 10)
            if (i == 99) {
              try {
                var Remote = returnCitySN['cip']
                var Computer = returnCitySN['cname']
                datas = {
                  AccountNumber: AccountNumber,
                  MD5Pass: MD5Pass,
                  ClientInfo: {
                    ComputerHostAddress: Remote,
                    RemoteAddress: Remote,
                    ComputerLocation: Computer,
                    UserLanguage: temp1,
                    Browser: strStart10,
                    BrowserVersion: broName1,
                    BrowserType: strStart10,
                    Platform: Platform,
                    PlatformVersion: broName1,
                    UserAgent: userAgent
                  }
                }
              } catch (e) {
                if (WithinIP != undefined) {
                  datas = {
                    AccountNumber: AccountNumber,
                    MD5Pass: MD5Pass,
                    ClientInfo: {
                      ComputerHostAddress: WithinIP,
                      RemoteAddress: WithinIP,
                      ComputerLocation: '内网地址',
                      UserLanguage: temp1,
                      Browser: strStart10,
                      BrowserVersion: broName1,
                      BrowserType: strStart10,
                      Platform: Platform,
                      PlatformVersion: broName1,
                      UserAgent: userAgent
                    }
                  }
                } else {
                  datas = {
                    AccountNumber: AccountNumber,
                    MD5Pass: MD5Pass,
                    ClientInfo: {
                      ComputerHostAddress: '0.0.0.0',
                      RemoteAddress: '0.0.0.0',
                      ComputerLocation: '无法获取',
                      UserLanguage: temp1,
                      Browser: strStart10,
                      BrowserVersion: broName1,
                      BrowserType: strStart10,
                      Platform: Platform,
                      PlatformVersion: broName1,
                      UserAgent: userAgent
                    }
                  }
                }
              }
            }
          }

          layer.msg('正在卖力登陆中...')
          $.ajax({
            type: 'post',
            url: StrUrl + '/api/Users/UserLogin',
            data: JSON.stringify(datas),
            contentType: 'application/json',
            success: function (user_login_result) {
              if (user_login_result.code == '0') {
                layer.msg('正在获取用户信息...')
                $.ajax({
                  type: 'post',
                  url: '/js/JavaHtml/Login.ashx', // + JSON.stringify(user_login_result.data),
                  data: { type: JSON.stringify(user_login_result.data) },
                  contentType:
                                        'application/x-www-form-urlencoded;charset=utf-8;',
                  success: function (login_ashx_result) {
                    var url =
                                            StrUrl +
                                            '/api/Menu/GetMenuList?AutoSystemID=' +
                                            user_login_result.data.UserAutoSystemID
                    layer.msg('正在菜单信息...')
                    $.getJSON(url, {}, function (getmenulist_result) {
                      var da = JSON.stringify(getmenulist_result.data)
                      $.post('/js/JavaHtml/Main.ashx', { data: da }, function (
                        main_ashx_result
                      ) {
                        window.location.href = 'Main.aspx'
                      })
                    })
                  }
                })
              } else {
                $('#InputPass').val('')
                layer.msg(user_login_result.msg)
              }
            },
            error: function (result) {
              // alert(JSON.stringify(result));
              layer.msg('API Service Closed')
            }
          })
        }
      } else {
        // layer.msg("账号或密码不能为空！");
        layer.msg(window.location.host)
      }
    }
  })
}

// function onLine(callback) {
//    var img = new Image();
//    img.src = 'https://www.baidu.com/favicon.ico?_t=' + Date.now();
//    img.onload = function () {
//        if (callback) callback(true)
//    };
//    img.onerror = function () {
//        if (callback) callback(false)
//    };
// }

function LogIn (StrUrl, StrAutoID) {
  $('#Exit').click(function () {
    Exit(StrUrl, StrAutoID)
  })

  $('#Exit1').click(function () {
    Exit(StrUrl, StrAutoID)
  })
}

function Exit (StrUrl, StrAutoID) {
  var url = StrUrl + '/api/Users/UserLogout'
  var AutoID = StrAutoID
  var ID = { AutoSystemID: AutoID }
  layer.confirm('真的要退出吗?', function (index) {
    $.ajax({
      type: 'post',
      url: url,
      data: JSON.stringify(ID),
      contentType: 'application/json',
      success: function (result) {
        if (result.code == 0) {
          sessionStorage.clear() // 清除所有session值
          window.location.href = 'LogIn.aspx'
        } else {
          layer.msg(result.msg)
        }
      },
      error: function (result, status) {
        layer.msg(result.msg)
      }
    })
  })
}

function Toggle () {
  $('.tailoring-container').toggle()
}

function UpdataHead (StrUrl, ID) {
  // 弹出框水平垂直居中
  (window.onresize = function () {
    var win_height = $(window).height()
    var win_width = $(window).width()
    if (win_width <= 768) {
      $('.tailoring-content').css({
        top: (win_height - $('.tailoring-content').outerHeight()) / 2,
        left: 0
      })
    } else {
      $('.tailoring-content').css({
        top: (win_height - $('.tailoring-content').outerHeight()) / 2,
        left: (win_width - $('.tailoring-content').outerWidth()) / 2
      })
    }
  })()

  // 弹出图片裁剪框
  // $(function () {
  //    $(".tailoring-container").toggle();
  // })
  // $("#replaceImg").on("click",function () {
  //    $(".tailoring-container").toggle();
  // });

  // cropper图片裁剪
  $('#tailoringImg').cropper({
    aspectRatio: 450 / 450, // 默认比例
    preview: '.previewImg', // 预览视图
    guides: false, // 裁剪框的虚线(九宫格)
    autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    movable: false, // 是否允许移动图片
    dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true, // 是否允许移动剪裁框
    resizable: true, // 是否允许改变裁剪框的大小
    zoomable: true, // 是否允许缩放图片大小
    mouseWheelZoom: true, // 是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: false, // 是否允许通过触摸移动来缩放图片
    rotatable: true, // 是否允许旋转图片
    crop: function (e) {
      // 输出结果数据裁剪图像。
    }
  })
  // 旋转
  $('.cropper-rotate-btn').on('click', function () {
    $('#tailoringImg').cropper('rotate', 45)
  })
  // 复位
  $('.cropper-reset-btn').on('click', function () {
    $('#tailoringImg').cropper('reset')
  })
  // 换向
  var flagX = true
  $('.cropper-scaleX-btn').on('click', function () {
    if (flagX) {
      $('#tailoringImg').cropper('scaleX', -1)
      flagX = false
    } else {
      $('#tailoringImg').cropper('scaleX', 1)
      flagX = true
    }
    flagX != flagX
  })

  // 裁剪后的处理
  $('#sureCut').on('click', function () {
    if ($('#tailoringImg').attr('src') == null) {
      return false
    } else {
      var cas = $('#tailoringImg').cropper('getCroppedCanvas') // 获取被裁剪后的canvas
      var base64url = cas.toDataURL('image/png') // 转换为base64地址形式
      $('#finalImg').prop('src', base64url) // 显示为图片的形式

      var cas = $('#tailoringImg').cropper('getCroppedCanvas')
      cas = cas.toDataURL('image/jpg')
      // console.log(cas)
      $('#registerForm').attr('enctype', 'multipart/form-data')
      var formData = new FormData($('#registerForm')[0])
      formData.append('imgBase64', JSON.stringify(cas))
      formData.append('autoSystemID', JSON.stringify(ID))
      // alert(JSON.stringify(formData));
      $.ajax({
        url: StrUrl + '/api/Users/UpdataUserICOO',
        type: 'POST',
        data: formData,
        timeout: 10000, // 超时时间设置，单位毫秒
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
          layer.msg(result.msg)
        },
        error: function (returndata) {
          layer.msg(returndata.msg)
        }
      })

      // 关闭裁剪框
      closeTailor()
    }
  })
}

// 关闭裁剪框
function closeTailor () {
  $('.tailoring-container').toggle()
}

// 图像上传
function selectImg (file) {
  if (!file.files || !file.files[0]) {
    return
  }
  var reader = new FileReader()
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result
    // 更换cropper的图片
    $('#tailoringImg').cropper('replace', replaceSrc, false) // 默认false，适应高度，不失真
  }
  reader.readAsDataURL(file.files[0])
}

// 个人资料
function UpdateData (ID) {
  var Url = '/ui/User/ManageInfo.aspx?USId=' + ID
  layer.open({
    title: ['个人资料', 'font-size:18px'],
    type: 2,
    area: ['34%', '41%'],
    content: Url
  })
}

export {
  detectOS,
  bro,
  LogIn,
  Toggle,
  UpdataHead,
  closeTailor,
  selectImg,
  UpdateData
}
