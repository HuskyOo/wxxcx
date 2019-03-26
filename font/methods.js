import font from "./font"
function nav () {
    return {
        welfare: font.index.welfare,
        course: font.index.course,
        ask: font.index.ask,
    }
}
function course () {
    return {
        hot: font.index.hot,
        new: font.index.new,
        batch: font.index.batch,
        shop: font.index.shop
    }
}
function welfare () {
    return {
        newHelp: font.index.newHelp,
        usNeedHelp: font.index.usNeedHelp,
        havaRaise: font.index.havaRaise,
        needRaise: font.index.needRaise,
        haveDonation: font.index.haveDonation,
        needDonation: font.index.needDonation,
    }
}
module.exports = {nav, course, welfare}