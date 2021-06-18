import React from "react";
import 'pages/expense/expense.css';
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Expense_svg from 'assets/img/expenses.svg'


const Expense = () => {
  const [titleInput, settitleInput] = useState("");
  const onChangetitle = event => settitleInput(event.target.value);

  const [dateOfExpenseInput, setDateOfExpenseInput] = useState("");
  const onChangeDateOfExpense = event => setDateOfExpenseInput(event.target.value);

  const [totalAmountInput, setTotalAmountInput] = useState("");
  const onChangeTotalAmount = event => setTotalAmountInput(event.target.value);

  const [concernedColocsInput, setConcernedColocsInput] = useState([]);
  const onChangeConcernedColocs = event => setConcernedColocsInput(event.target.value);

  const [onSubmit, setOnSubmit] = useState(false);

  const fetchFunction = () => {
    
    fetch("http://localhost:3000/expenses", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expense: {
          title:titleInput,
          date_of_expense: dateOfExpenseInput,
          total_amount: totalAmountInput,
          concerned_colocs: [concernedColocsInput],
          user_id: 2
        },
      }),
    })
      .then((response) => response.json())
      .then((response) =>  console.log(response));
  };


  return(
    <>
    <div id="container_expense">
      <img id="expense-svg" src={Expense_svg} alt="" />
      <h1 id="title-expense">Dépenses</h1>
      <h3>Crées une demande de partage de frais liés à la coloc</h3>
        <div className="body-form">
          <div className="title-input">
            <h3>Titre de la dépense</h3>
            <label htmlFor="title">
              <input  
              onChange={onChangetitle} 
              type="text" 
              value={titleInput}
              placeholder="Saisis un titre"/>
            </label>
          </div>
          <div className="DateOfExpense-input">
            <h3>Date de la dépense</h3>
            <input  
            onChange={onChangeDateOfExpense} 
            type="text" 
            value={dateOfExpenseInput}
            placeholder="Saisisla date de la dépense"/>
          </div>
          <div className="DateOfExpense-input">
            <h3>Total de la facture</h3>
            <input  
            onChange={onChangeTotalAmount} 
            type="text" 
            value={totalAmountInput}
            placeholder="Saisisla le total de la dépense"/>
          </div>
          <div className="ConcernedColocs-input">
            <h3>Colocs concernés</h3>
            <input  
            onChange={onChangeConcernedColocs} 
            type="text" 
            value={concernedColocsInput}
            placeholder=" Saisis les colocs concernés"/>
          </div>
          <button link='/Profil' onClick={fetchFunction} title='Valider'>Valider</button>
        </div>
     </div>
    </>
  )
};

export default Expense;
