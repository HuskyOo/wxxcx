// let http = require("./http")
import http from "./http"
// let url = require("./url")
import url from "./url"
function zang () {
    return new Promise ((resolve, reject) => {
        http(url.zang, {}, (res) => {resolve(res.data)})
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

export { zang, chinese, book, commonweal, interview, sing }