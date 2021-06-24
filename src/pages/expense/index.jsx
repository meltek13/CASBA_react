import React from "react";
import 'pages/expense/expense.css';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Expense_svg from 'assets/img/money_colocs.svg';
import url from "data/url.json";
import { Notif_sucess_expense } from "components/Notifications";
import { Notif_error_expense } from "components/Notifications";

const Expense = () => {
  const [titleInput, settitleInput] = useState("");
  const onChangetitle = event => settitleInput(event.target.value);

  const [dateOfExpenseInput, setDateOfExpenseInput] = useState("");
  const onChangeDateOfExpense = event => setDateOfExpenseInput(event.target.value);

  const [totalAmountInput, setTotalAmountInput] = useState("");
  const onChangeTotalAmount = event => setTotalAmountInput(event.target.value);
  const input_total_corrected = totalAmountInput.replace(",",".")

  const [concernedColocsInput, setConcernedColocsInput] = useState([]);
  const onChangeConcernedColocs = event => setConcernedColocsInput(event.target.value);

  const ExpenseFetch = (e) => {
    e.preventDefault()
    fetch(url.url + "expenses", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expense: {
          id_expense: Math.random().toString(20).substr(2),
          title:titleInput,
          date_of_expense: dateOfExpenseInput,
          total_amount: input_total_corrected,
          concerned_colocs: [concernedColocsInput], 
          user_id:  Cookies.get("current_user_id"),
          flatsharing_id: Cookies.get("flat_id"),
          split_amount_to_colocs: Math.ceil(input_total_corrected / ([concernedColocsInput].length + 1))
        },
      }),
    })
      .then((response) => response.json())
      .then((response) =>  {
        
           updateSoldePositif(response)
           updateSoldeNegatif(response)
        // if (response.ok == true) {
        //   Notif_sucess_expense()
        // } else{
        //   Notif_error_expense()
        // }
      });
      Notif_sucess_expense()/* en attente de régler prob rechargement de page jute au dessus*/
  };


  const updateSoldePositif = (expense) => {

    fetch(url.url + "members/" + expense.expense.user_id, {
      method: "get",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {

    const formData = new FormData();
    formData.append("solde", response.solde + expense.expense.split_amount_to_colocs );
    fetch(url.url + "members/" + expense.expense.user_id, {
      method: "PUT",
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
      });
    });
  };

  const updateSoldeNegatif = (expense) => {
    expense.expense.concerned_colocs.forEach( colloc_id => {
      fetch(url.url + "members/" + colloc_id, {
        method: "get",
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
  
      const formData = new FormData();
      formData.append("solde", response.solde - expense.expense.split_amount_to_colocs );
      fetch(url.url + "members/" + colloc_id, {
        method: "PUT",
        body: formData,
      })
        .catch((error) => console.log(error))
        .then((response) => {
          console.log(response);
        });
      });
    })
    
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
                                    pattern="[a-zA-Z0-9\s]+"
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
                                    pattern="[0-9]{1,5}"
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
                 
                    <input id="btn-submit-expense" type="submit" value="créer" onClick={ExpenseFetch}/>
                  
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
