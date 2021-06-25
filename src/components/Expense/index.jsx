import React from 'react';
import 'components/Expense/expense.css';
import Expense_svg from 'assets/img/money_colocs.svg';

const DisplayExpense = ({ title, price }) => (
  <>
    <div className="card-expense-body">
      <img src={Expense_svg} id="img-card-svg" alt="illustration portefeuille" />
      <div className="infos-display-container">
        <h4 className="tile-display-expense">{title}</h4>
        <p className="text-display-expense">
          {price}
          €
        </p>
      </div>
    </div>
  </>
);

export default DisplayExpense;
