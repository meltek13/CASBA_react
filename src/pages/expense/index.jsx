import React from "react";
import 'pages/expense/expense.css';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Expense_svg from 'assets/img/money_colocs.svg';
import url from "data/url.json";
import { Notif_sucess_expense } from "components/Notifications";
import { Notif_error_expense } from "components/Notifications";
import { Form, Input, Button, Select, InputNumber, Checkbox,Row , Col } from 'antd';
import { useParams } from "react-router-dom";
  

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

  const { id } = useParams();
  const [flatMates, setFlatMates] = useState([]);


  const [concernedColocsInput2, setConcernedColocsInput2] = useState([]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const findFlatMates = () => {
    fetch(url.url + "flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => {
        setFlatMates((oldArray) => [...oldArray, response.admin])
        response.guest.forEach((flatmate) => {
          if (flatmate !== null) {
            if (flatmate.id === parseInt(Cookies.get("current_user_id"))) {
              setFlatMates((oldArray) => [...oldArray, flatmate])
            }
          }
        }); 
      });
  };

  useEffect(() => {
    findFlatMates();
  }, []);

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
          concerned_colocs: concernedColocsInput2, 
          user_id:  Cookies.get("current_user_id"),
          flatsharing_id: Cookies.get("flat_id"),
          split_amount_to_colocs: Math.ceil(input_total_corrected / (concernedColocsInput2.length ))
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

const deleteFlatMate = (flatmate) =>{
  const array = []
  concernedColocsInput2.forEach(x=>{
    if (x !== flatmate){
      array.push(x)
     }
    })
    setConcernedColocsInput2([])
    array.forEach(x=>{
      setConcernedColocsInput2((oldArray) => [...oldArray, x])
    })
    

}
console.log(concernedColocsInput2.length)
console.log(concernedColocsInput)

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
        let amount = response.solde + expense.expense.total_amount;

      expense.expense.concerned_colocs.forEach(x=>{
       if (x === expense.expense.user_id){
         let amount = response.solde + expense.expense.split_amount_to_colocs
       } 
       })
        
       
    const formData = new FormData();
    formData.append("solde", amount );
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
    console.log(expense.expense)
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

      <Form {...layout}  name="control-ref" >
        <span>Intitulé de la dépense ?</span>
        <Form.Item
          name="title"
          label=""
          onChange={(event) => settitleInput(event.target.value)}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <span>Montant ? </span>
        <Form.Item  
          name="montant"
          label=""
          onChange={(event) => setTotalAmountInput(event.target.value)}
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="checkbox-group" label="Checkbox.Group">
        <Checkbox.Group>
          <Row>
            
              <Col span={8}>
              <Checkbox
                value="1"
                onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
                style={{
                  lineHeight: '32px',
                }}
              >
                melvin
              </Checkbox>
            </Col>
          
          </Row>
          <Row>
            
            <Col span={8}>
            <Checkbox
              value="2"
              onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
              style={{
                lineHeight: '32px',
              }}
            >
              Boris
            </Checkbox>
          </Col>
        
        </Row>
        <Row>
            
            <Col span={8}>
            <Checkbox
              value="3"
              onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
              style={{
                lineHeight: '32px',
              }}
            >
              Theo
            </Checkbox>
          </Col>
        
        </Row>
        <Row>
            
            <Col span={8}>
            <Checkbox
              value="4"
              onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
              style={{
                lineHeight: '32px',
              }}
            >
              Fred
            </Checkbox>
          </Col>
        
        </Row>
        </Checkbox.Group>
      </Form.Item>

        <Form.Item {...tailLayout}>
          <Button  type="primary" htmlType="submit" onClick={ExpenseFetch}>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>

    </>
  )
};

export default Expense;
