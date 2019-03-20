var app = getApp()
function request (url,data,fun) {
    wx.request({
        url: app.globalData.pageUrl + url,
        data: data,
        success: (res) => {
            fun(res)
        },
        fail: (err) => {
            console.log(err)
        }
    })
}
export default request