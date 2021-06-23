import url from "data/url.json";
import React from "react";
import { useState, useEffect } from "react";
import CardExpense from "components/Expense";
import "pages/display_expense/display_expense.css";

const PageExpense = () => {
  const [Expense, setExpense] = useState([]);

  const AllExpenses = () => {
    fetch(url.url + "expenses", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setExpense(response));
  };

  console.log(
    Expense.sort(function (a, b) {
      return b - a;
    })
  );

  useEffect(() => {
    AllExpenses();
  }, []);
  return (
    <div id="expense-container">
      <h2>Dépenses</h2>
      {Expense
        ? Expense.reverse().map((e) => {
            return (
              <CardExpense title={`${e.title}`} price={`${e.total_amount}`} />
            );
          })
        : ""}
    </div>
  );
};

export default PageExpense;
