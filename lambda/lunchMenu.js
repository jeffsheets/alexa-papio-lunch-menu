
const {fetchMenu} = require('./menuService');

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const cache = {};
async function lookupMenu(menuDate) {
    if (!cache[menuDate]) {
        cache[menuDate] = await fetchMenu(menuDate);
    }

    return cache[menuDate];
}

module.exports.handleRequest = async request => {
    const menuDate = request.intent.slots.menuDate.value || new Date().toISOString().slice(0,10);
    console.info(`Received request for ${menuDate}`);

    const menuResult = await lookupMenu(menuDate);
    if (!menuResult) {
        return `I could not find a menu for ${menuDate}. Maybe it is Spring or Summer Break? Please ask me again with a valid school day.`;
    }

    const { date, entreeNames } = menuResult;
    const foundDate = new Date(date);
    const response = `Lunch options for ${WEEKDAYS[foundDate.getDay()]} ${MONTHS[foundDate.getMonth()]} ${foundDate.getDate()} are ${entreeNames.join(" and also ")}`;
    console.info(`Response is ${response}`);
    return response;
}
