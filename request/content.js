// let http = require("./http")
import http from "./http"
// let url = require("./url")
import url from "./url"
function zang () {
    return new Promise ((resolve, reject) => {
        http(url.zang, {token: wx.getStorageSync('token')}, (res) => {resolve(res.data)})
    })
}
function chinese () {
    return new Promise ((resolve, reject) => {
        http(url.chinese, {}, (res) => {resolve(res.data)})
    })
}
function book () {
    return new Promise ((resolve, reject) => {
        http(url.book, {}, (res) => {resolve(res.data)})
    })
}
function commonweal () {
    return new Promise ((resolve, reject) => {
        http(url.commonweal, {}, (res) => {resolve(res.data)})
    })
}
function interview () {
    return new Promise ((resolve, reject) => {
        http(url.interview, {}, (res) => {resolve(res.data)})
    })
}
function sing () {
    return new Promise ((resolve, reject) => {
        http(url.sing, {}, (res) => {resolve(res.data)})
    })
}
function allClassify (id = 1) {
    return new Promise ((resolve, reject) => {
        http(url.allClassify, {id, token: wx.getStorageSync('token')}, (res) => {resolve(res.data)})
    })
}
function buy () {
    return new Promise ((resolve, reject) => {
        http(url.buy, {token: wx.getStorageSync('token')}, (res) => {resolve(res.data)})
    })
}
function religionCate (id) {
    return new Promise ((resolve, reject) => {
        http(url.religionCate, {id, token: wx.getStorageSync('token')}, (res) => {resolve(res.data)})
    })
}
function mediaurl (params) {
    return new Promise ((resolve, reject) => {
        http(url.mediaurl, params, (res) => {resolve(res.data)})
    })
}
function comdetails (params) {
    return new Promise ((resolve, reject) => {
        http(url.comdetails, params, (res) => {resolve(res.data)})
    })
}
function mediarand (params) {
    return new Promise ((resolve, reject) => {
        http(url.mediarand, {token: wx.getStorageSync('token'), ...params}, (res) => {resolve(res.data)})
    })
}
function aboutus (params) {
    return new Promise ((resolve, reject) => {
        http(url.aboutus, {}, (res) => {resolve(res.data)})
    })
}

export { zang, chinese, book, commonweal, interview, sing, allClassify, buy, religionCate, mediaurl, comdetails, mediarand, aboutus }