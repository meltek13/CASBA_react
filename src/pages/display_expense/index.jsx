import url from 'data/url.json';
import React, { useState, useEffect } from 'react';

import CardExpense from 'components/Expense';
import 'pages/display_expense/display_expense.css';
import { useParams } from 'react-router-dom';

const PageExpense = () => {
  const [Expense, setExpense] = useState([]);
  const { id } = useParams();

  const AllExpenses = () => {
    fetch(`${url.url}expenses`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((x) => {
          if (x.flatsharing_id === parseInt(id)) {
            setExpense((oldArray) => [...oldArray, x]);
          }
        });
      });
  };

  useEffect(() => {
    AllExpenses();
  }, []);

  return (
    <div id="expense-container">
      <h2>Dépenses</h2>
      {Expense
        ? Expense.reverse().map((e) => (
          <CardExpense title={`${e.title}`} price={`${e.total_amount}`} />
        ))
        : ''}
    </div>
  );
};

export default PageExpense;
