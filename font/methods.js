import font from "./font"
import util from "../utils/util"
function index () {
    util.fontFamily()
    return font.index
}
function components () {
    util.fontFamily()
    return font.components
}
function myCourse () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.myCourse) {
        obj[key] = font.myCourse[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function my () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.my) {
        obj[key] = font.my[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function paddingpayment () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.paddingpayment) {
        obj[key] = font.paddingpayment[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function albumDetail () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.albumDetail) {
        obj[key] = font.albumDetail[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function albumOrder () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.albumOrder) {
        obj[key] = font.albumOrder[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function bookFont () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.bookFont) {
        obj[key] = font.bookFont[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function classifyDetail () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.classifyDetail) {
        obj[key] = font.classifyDetail[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function bookdetail () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.bookdetail) {
        obj[key] = font.bookdetail[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function bookorder () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.bookorder) {
        obj[key] = font.bookorder[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}
function indent () {
    util.fontFamily()
    let lanIndex = wx.getStorageSync('lan');
    let obj = {}
    for (let key in font.indent) {
        obj[key] = font.indent[key][lanIndex]
    }
    // console.log(lanIndex)
    return obj
}

module.exports = { index, components, myCourse, my, paddingpayment, albumDetail, albumOrder, bookFont, classifyDetail, bookdetail, bookorder, indent }