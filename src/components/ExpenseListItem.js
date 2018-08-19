import React from 'react';
import { Link } from 'react-router-dom';


const ExpenseListItem = ({ description, amount, createdAt, id }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p> {amount} - {createdAt} </p>

    </div>
);

export default ExpenseListItem;

// a connect() by itself just gives access to the dispatch
// export unconnected component for testing. no connected version here so default is fine