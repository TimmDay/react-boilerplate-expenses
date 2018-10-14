import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//link takes the expense id into the url, where the router passes it to match.params.id
const ExpenseListItem = ({description = '', amount = '', createdAt = '', id = '-1'}) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format('ddd, Do MMM YYYY')}</span>
        </div>
        <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
    </Link>
);

export default ExpenseListItem;

// a connect() by itself just gives access to the dispatch
// export unconnected component for testing. no connected version here so default is fine