const uuid = require("uuid-random");
const moment = require("moment-timezone");

exports.generateVTUId = () => {
    const uniqueID = uuid().split("-")[0];
    return `${moment().tz("Africa/Lagos").format("YYYYMMDDHHmmss")}${uniqueID}`;
};
