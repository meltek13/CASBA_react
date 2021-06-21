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

  const ExpenseFetch = () => {
    
    fetch("http://localhost:3000/expenses", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expense: {
          id_expense: Math.random().toString(20).substr(2),
          title:titleInput,
          date_of_expense: dateOfExpenseInput,
          total_amount: totalAmountInput,
          concerned_colocs: [concernedColocsInput], 
          user_id:  Cookies.get("current_user_id"),
          flatsharing_id: Cookies.get("flat_id"),
          split_amount_to_colocs: totalAmountInput / ([concernedColocsInput].length + 1)
        },
      }),
    })
      .then((response) => response.json())
      .then((response) =>  console.log(response));
  };

  

  return(
    <>
      <div id="container_expense">
        <img id="expense-svg" src={Expense_svg} alt="illustration tirelire cochon " />
        <h2>Crées un dépense liée à la colocation</h2>
        <div id="form-action">
          <input className="c-checkbox" type="checkbox" id="start"/>
          <input className="c-checkbox" type="checkbox" id="progress2"/>
          <input className="c-checkbox" type="checkbox" id="progress3"/>
          <input className="c-checkbox" type="checkbox" id="finish"/>
          <div className="c-form__progress"></div>

            <div className="c-formContainer">
              {/* <div className="c-welcome">Welcome aboard!</div> */}
              <form className="c-form" action="">
                <div className="c-form__group">
                  <label className="c-form__label" htmlFor="title-expense">
                                <input
                                    type="text"
                                    id="username"
                                    className="c-form__input"
                                    placeholder=" "
                                    pattern="[a-z0-9\s]+"
                                    onChange= {onChangetitle}
                                    required
                                    value={titleInput}/>

                                <label className="c-form__next" htmlFor="progress2" role="button">
                                    <span className="c-form__nextIcon"></span>
                                </label>

                  <span className="c-form__groupLabel">Titre de la dépense</span>
                  <b className="c-form__border"></b>
                  </label>
                </div>

                <div className="c-form__group">
                  <label className="c-form__label" htmlFor="total_amount">
                                <input
                                    type="text"
                                    id="username"
                                    className="c-form__input"
                                    placeholder=" "
                                    pattern="^[0-9]{1,10}"
                                    onChange = {onChangeTotalAmount}
                                    value={totalAmountInput}
                                    required/>

                                <label className="c-form__next" htmlFor="progress3" role="button">
                                    <span className="c-form__nextIcon"></span>
                                </label>

                  <span className="c-form__groupLabel">Total de la dépense</span>
                  <b className="c-form__border"></b>
                  </label>
                </div>

                <div className="c-form__group">
                  <label className="c-form__label" htmlFor="concerned_colocs">
                                <input
                                    type="number"
                                    id="username"
                                    className="c-form__input"
                                    placeholder=" "
                                    pattern="^[0-9]{1,10}"
                                    onChange={onChangeConcernedColocs}
                                    value={concernedColocsInput}
                                    required/>

                  <Link to='/expense-sucess'>
                    <input id="btn-submit-expense" type="submit" value="créer" onClick={ExpenseFetch}/>
                  </Link>             
                  
                  <span className="c-form__groupLabel">Colocs concernées</span>
                  <b className="c-form__border"></b>
                  </label>
                </div>

               <label className="c-form__toggle" htmlFor="start">Créer une Dépense</label>

              </form>
              
            </div>
          </div>
      </div>
    </>
  )
};

export default Expense;
