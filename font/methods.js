import font from "./font"
import util from "../utils/util"
function index () {
    util.fontFamily()
    return font.index
}
function myCourse () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.myCourse) {
        obj[key] = font.myCourse[key][lanIndex]
    }
    console.log(lanIndex)
    return obj
}
module.exports = { index, myCourse }