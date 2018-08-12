import moment from "moment/moment";

export default [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'rent',
    note: '',
    amount: 55555,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'bill eggs',
    note: '',
    amount: 333,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
