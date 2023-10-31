const cron = require('node-cron');
const { changeOrderStatus } = require("./changeOrderStatus");
const settingsModel = require('../models/settingsModel')
// Define the cronjob
let cronJob

function getCronExpression(timeInterval, timeIntervalUnit) {
    let cronSchedule;
    // let cronSchedule;
    if (timeIntervalUnit === 's') {
        const sec = parseInt(timeInterval);
        if (!isNaN(sec)) {
            cronSchedule = `"*/${sec} * * * * *"`;
        }
    } else if (timeIntervalUnit === 'm') {
        const min = parseInt(timeInterval);
        if (!isNaN(min)) {

            cronSchedule = `0 */${min} * * * *`;
        }
    } else if (timeIntervalUnit === 'h') {
        const hours = parseInt(timeInterval);
        if (!isNaN(hours)) {
            // Schedule every 'hours' hours
            cronSchedule = `0 */${hours} * * * *`;
        }
    } else if (timeIntervalUnit === 'd') {
        const days = parseInt(timeInterval);
        if (!isNaN(days)) {
            // Schedule every 'days' days at midnight
            cronSchedule = `0 0 */${days} * * *`;
        }
    }
    return cronSchedule
}

const scheduleJob = async () => {
    const config = await settingsModel.findOne();
    const TimeInterval = config.processDays
    // const TimeInterval = 20;
    const timeIntervalUnit = 'd'
    // const timeIntervalUnit = 's'
    const cronSchedule = getCronExpression(TimeInterval, timeIntervalUnit)
    if (cronSchedule) {
        const cronJob = cron.schedule(cronSchedule, changeOrderStatus);
        cronJob.start()
        console.log("Cronjob- OrderStatusChange -Started")
        return cronJob;
    } else {
        console.log('Invalid time interval format.');
    }
}
const stopCronJob = () => {
    console.log("Stopping the cron job");
    if (cronJob) {
        cronJob.stop()
    }
}

module.exports = {
    scheduleJob,
    stopCronJob,
}
// const call = () => {
//     console.log("calling ");
// }
// scheduleJob('*/1 * * * * *', changeOrderStatus);
// setTimeout(() => {
//     console.log("Stopping the cron job");
//     cronJob.stop();
// }, 5000);

// scheduleJob('2d', changeOrderStatus);

// // Example usage:
// scheduleJob('1h', () => {
//     // This function will be executed every 1 hour
//     console.log('Scheduled job executed.');
// });

// scheduleJob('2d', () => {
//     // This function will be executed every 2 days
//     console.log('Scheduled job executed.');
// });


// working example for 10sec
// const call = () => {
//     console.log("calling ");
// }

// let scheduledJob;

// const cons = (timeInt) => {
//     console.log("Cron job started ");
//     scheduledJob = cron.schedule(timeInt, call);
// }

// cons('*/1 * * * * *');

// setTimeout(() => {
//     console.log("Stopping the cron job");
//     scheduledJob.stop();
// }, 5000); 
