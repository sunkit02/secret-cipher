const MONTH_NAMES = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
];

/**
 * Takes the hour and minute of the day in a 24-hour clock
 * and returns a string that represents the 12-hour clock
 * equivalent appended with AM or PM
 * @param hour the integer representation of an hour within a 24-hour day
 *  `           (max is 23 since 24 would be considered the next day)
 * @param minute the integer representation of a minute within a 60-minute hour
 *              (max is 59 since 60 would be considered the next hour)
 */
const hourAndMinuteToString = (hour: number, minute: number): string => {
    if (hour > 23 || hour < 0) {
        return "Error: Hour must be between 0 and 23";
    }
    if (minute > 59 || minute < 0) {
        return "Error: Minute must be between 0 and 59";
    }
    let isAfterNoon = false;
    let result = "";
    if (hour > 12) {
        result += `${hour - 12}:`;
        isAfterNoon = true;
    } else {
        result += `${hour}:`;
    }
    if (minute < 10) {
        result += `0${minute} `;
    } else {
        result += `${minute} `;
    }
    if (isAfterNoon) {
        result += "PM";
    } else {
        result += "AM";
    }
    return result;
}

/**
 * Takes the month and day and returns a simple string representation
 * in the format: (MMM dd) where MMM is a three letter abbreviation of
 * each month's full name and dd is the numeric day of the month
 * @param month the integer representation of the month of the year
 *              starting with 0 as January.
 * @param day the integer representation of the day of the month
 */
const monthAndDayToString = (month: number, day: number): string => {
    if (month > 11 || month < 0) {
        return "Error: Month must be between 0 and 11";
    }
    // todo: add more validation to ensure that each month gets the right upperbound for number of days
    if (day > 31 || day < 0) {
        return "Error: Day must be between 0 and 31";
    }

    return `${MONTH_NAMES[month]} ${day}`;
}

const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDay() === date2.getDay();
}

const getDateString = (date: Date): string => {
    let now = new Date();
    if (isSameDay(now, date)) {
        return hourAndMinuteToString(date.getHours(), date.getMinutes());
    }
    return monthAndDayToString(date.getMonth(), date.getDay());
};


export {hourAndMinuteToString, monthAndDayToString, getDateString};