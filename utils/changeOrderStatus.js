
const orderModel = require('../models/orderModel');
const { isTimeDifferenceValid } = require("./isTimeDifferenceValid");

const orderStatuses = ['Placed', 'Order confirmed', 'Processing', 'Shipped'];
// callback
let num = 1
function changeOrderStatus() {
    console.log("🚀 Scheduled cronjob changeOrderStatus: running-  ", num)
    num++
    const change = async () => {
        const dateTime = new Date()
        const orders = await orderModel.find({ orderStatus: { $nin: ['Shipped', 'Delivered'] } });
        const config = await settingsModel.findOne();
        const processDays = config.processDays
        // console.log("🚀 ~ file: changeOrderStatus.js:10 ~ change ~ orders:", orders)
        for (const order of orders) {
            const isValid = isTimeDifferenceValid(order.statusLastUpdate, dateTime, processDays, 'd')
            // const isValid = isTimeDifferenceValid(order.statusLastUpdate, dateTime, 1, 's')
            if (isValid) {
                let nextOrderStatus = orderStatuses[orderStatuses.indexOf(order.orderStatus) + 1];
                order.orderStatus = nextOrderStatus;
                order.statusLastUpdate = new Date();
                await order.save();
            } else {
                continue
            }
        }
    }
    change()
}

module.exports = { changeOrderStatus }