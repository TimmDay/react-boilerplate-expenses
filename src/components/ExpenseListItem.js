import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ description = '', amount='', createdAt='', id='-1' } ) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>

        <p>
            {/*${amount / 100}*/}
            {numeral(amount / 100).format('$0,0.00')}
            -
            {moment(createdAt).format('ddd, Do MMM YYYY')}
        </p>


    </div>
);

export default ExpenseListItem;

// a connect() by itself just gives access to the dispatch
// export unconnected component for testing. no connected version here so default is fine