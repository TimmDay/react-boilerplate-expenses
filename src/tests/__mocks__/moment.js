// mock library. for use in testing, to replace the actual library functionality
// here, we ensure that 'current moment' timestamps are always the same number,
// and remove a bunch of the bulk so tests run faster
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};