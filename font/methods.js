import font from "./font"
import util from "../utils/util"
let lanIndex = wx.getStorageInfoSync('lan');
function nav (type) {
    util.fontFamily()
    if (type) {
        return {
            welfare: font.index.welfare,
            course: font.index.course,
            ask: font.index.ask,
        }
    }
    return {
        welfare: font.index.welfare[lanIndex],
        course: font.index.course[lanIndex],
        ask: font.index.ask[lanIndex],
    }
}
function course (type) {
    util.fontFamily()
    if (type) {
        return {
            hot: font.index.hot,
            new: font.index.new,
            batch: font.index.batch,
            shop: font.index.shop
        }
    }
    return {
        hot: font.index.hot[lanIndex],
        new: font.index.new[lanIndex],
        batch: font.index.batch[lanIndex],
        shop: font.index.shop[lanIndex]
    }
}
function welfare (type) {
    util.fontFamily()
    if(type){
        return {
            newHelp: font.index.newHelp,
            usNeedHelp: font.index.usNeedHelp,
            havaRaise: font.index.havaRaise,
            needRaise: font.index.needRaise,
            haveDonation: font.index.haveDonation,
            needDonation: font.index.needDonation,
        }
    }
    return {
        newHelp: font.index.newHelp[lanIndex],
        usNeedHelp: font.index.usNeedHelp[lanIndex],
        havaRaise: font.index.havaRaise[lanIndex],
        needRaise: font.index.needRaise[lanIndex],
        haveDonation: font.index.haveDonation[lanIndex],
        needDonation: font.index.needDonation[lanIndex],
    }
}
module.exports = {nav, course, welfare}