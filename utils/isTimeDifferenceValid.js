function isTimeDifferenceValid(statusTime, currentDateTime, target, timeIntervalUnit) {
    const timeDiff = currentDateTime - statusTime;

    // Define conversion factors for different time units to milliseconds
    const timeUnitInMilliseconds = {
        ms: 1,
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24,
    };

    // Check if the time difference is greater than the target value in the specified unit
    return timeDiff > target * timeUnitInMilliseconds[timeIntervalUnit];
}
module.exports = {isTimeDifferenceValid}
// const statusTime = new Date('2023-10-29T10:00:00').getTime();
// const currentDateTime = new Date('2023-10-30T10:02:00').getTime();
// const target = 1;
// const timeIntervalUnit = 'd';

// const isValid = isTimeDifferenceValid(statusTime, currentDateTime, target, timeIntervalUnit);
// console.log(`Is time difference valid: ${isValid}`);
