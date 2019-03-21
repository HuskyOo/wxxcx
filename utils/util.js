const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const fontFamily = () => {
  // 下载字体
  // wx.loadFontFace({
  //   family: '藏研黑体',
  //   source: "url('https://qiuniu.vmobplus.com/CTRC-HT.ttf')",
  //   success: res => {
  //     console.log(res)
  //   }
  // })
  // wx.loadFontFace({
  //   family: 'Himalaya-G',
  //   source: "url('https://qiuniu.vmobplus.com/Himalaya-G.ttf')",
  //   success: res => {
  //     console.log(res)
  //   }
  // })
  // wx.loadFontFace({
  //   family: 'Jomolhari',
  //   source: "url('https://qiuniu.vmobplus.com/Jomolhari-alpha3c-0605331.ttf')",
  //   success: res => {
  //     console.log(res)
  //   }
  // })
}

const getCanSize = (img) => {
  return new Promise(function (resolve) {
    wx.getImageInfo({
      src: img,
      success: function(res) {
        // console.log(res)
        var arr = {w:res.width, h:res.height, path:res.path}
        resolve(arr)
      },
      fail () {
        console.log(1)
      }
    })
  })
}

const canImg = (img, canid, that, fun1, fun2) => {
  // return new Promise(function (resolve) {
    wx.getImageInfo({
      src: img,
      success: res => {
        var w = res.width
        // w /= 6
        var h = res.height
        // h /= 6
        var mum = Math.floor(w / 375)
        if(mum > 0){
          w /= mum
          h /= mum
        }
        var arr = {w:w, h:h, path:res.path}
        fun1 (arr)


        setTimeout(() => {
          var temp = w-h>0 ? w : h
          temp = temp/5
          var path = res.path
          var ctx = wx.createCanvasContext(canid, that)
          ctx.drawImage(path,0,0,w,h)
          ctx.drawImage('../../images/watermark.png',(w/2) - (temp/50*40/2),(h/2) - (temp/2),temp/50*40,temp)
          ctx.draw(true, res => {
            wx.canvasToTempFilePath({
              canvasId: canid,
              fileType: 'jpg',
              quality: 1,
              success: res => {
                fun2(res.tempFilePath)
              }
            },that)
          })
        }, 2000)
        
      }
    })
  // }) 
}

module.exports = {
  formatTime: formatTime,
  fontFamily: fontFamily,
  canImg: canImg,
  getCanSize:getCanSize
}
