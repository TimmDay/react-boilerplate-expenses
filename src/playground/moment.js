// MOMENT
// const date = new Date();
import moment from "moment/moment";

const now = moment(); //no arg - current point in time
console.log(now);
console.log(now._d);
console.log(now.format());
console.log(now.format(`Do MMM, YYYY`));

//REACT DATES