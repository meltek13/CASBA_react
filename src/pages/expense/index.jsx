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
import CheckboxDisplay from "components/checkbox"

const Expense = () => {
  const [titleInput, settitleInput] = useState("");
  const [dateOfExpenseInput, setDateOfExpenseInput] = useState("");
  const [totalAmountInput, setTotalAmountInput] = useState("");
  const input_total_corrected = totalAmountInput.replace(",",".")
  const [concernedColocsInput2, setConcernedColocsInput2] = useState([]);
  const { id } = useParams();
  const [flatMates, setFlatMates] = useState([]);

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
        
        setFlatMates(response)
      });
  };

  useEffect(() => {
    findFlatMates();
  }, []);

  console.log(flatMates)

  const ExpenseFetch = (e) => {
    if (titleInput.length < 1 || input_total_corrected.length <1 || concernedColocsInput2.length < 1 ){
      Notif_error_expense()
    }else {
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
        console.log(response)
           updateSoldePositif(response)
      });
      Notif_sucess_expense()
    }
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
        formData.append("solde", response.solde + expense.expense.total_amount );
        fetch(url.url + "members/" + expense.expense.user_id, {
          method: "PUT",
          body: formData,
        })
          .catch((error) => console.log(error))
          .then((response) => {
            updateSoldeNegatif(expense)
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
    <h1>Les dépenses</h1>
       <h2>
        Les bons comptes font les bons collocs
       </h2>
      <div id="container_expense">
        <img id="expense-svg" src={Expense_svg} alt="illustration tirelire cochon " />
       
     

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
        <Form.Item name="checkbox-group" label="Pour qui ?">
        <Checkbox.Group>
{flatMates?.admin? <Row>
        <Col span={8}>
        <Checkbox
          value={flatMates.admin.id}
          onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatMates.admin.email}
        </Checkbox>
      </Col>
    </Row>: <p>non</p>}
{flatMates?.guest?.[0]? <Row>
        <Col span={8}>
        <Checkbox
          value={flatMates.guest[0].id}
          onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatMates.guest[0].email}
        </Checkbox>
      </Col>
    </Row> : <span></span>}
{flatMates?.guest?.[1]?   <Row>
        <Col span={8}>
        <Checkbox
          value={flatMates.guest[1].id}
          onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatMates.guest[1].email}
        </Checkbox>
      </Col>
    </Row>: <span></span>}
{flatMates?.guest?.[2]?   <Row>
        <Col span={8}>
        <Checkbox
          value={flatMates.guest[2].id}
          onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatMates.guest[2].email}
        </Checkbox>
      </Col>
    </Row> : <span></span>}
{flatMates?.guest?.[3]?   <Row>
        <Col span={8}>
        <Checkbox
          value={flatMates.guest[3].id}
          onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatMates.guest[3].email}
        </Checkbox>
      </Col>
    </Row> : <span></span>}
{flatMates?.guest?.[4]?  <Row>
        <Col span={8}>
        <Checkbox
          value={flatMates.guest[4].id}
          onChange={e=> e.target.checked? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]): deleteFlatMate(e.target.value)}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatMates.guest[4].email}
        </Checkbox>
      </Col>
    </Row> : <span></span>}
{flatMates?.guest?.[5]?  <CheckboxDisplay flatmate={flatMates.guest[5]}/> : <span></span>}
{flatMates?.guest?.[6]?  <CheckboxDisplay flatmate={flatMates.guest[6]}/> : <span></span>}
{flatMates?.guest?.[7]?  <CheckboxDisplay flatmate={flatMates.guest[7]}/> : <span></span>}
{flatMates?.guest?.[8]?  <CheckboxDisplay flatmate={flatMates.guest[8]}/> : <span></span>}
{flatMates?.guest?.[9]?  <CheckboxDisplay flatmate={flatMates.guest[9]}/> : <span></span>}
{flatMates?.guest?.[10]?  <CheckboxDisplay flatmate={flatMates.guest[10]}/> : <span></span>}
{flatMates?.guest?.[11]?  <CheckboxDisplay flatmate={flatMates.guest[11]}/> : <span></span>}
{flatMates?.guest?.[12]?  <CheckboxDisplay flatmate={flatMates.guest[12]}/> : <span></span>}
          
        </Checkbox.Group>
      </Form.Item>

        <Form.Item {...tailLayout}>
          <Button  type="primary" htmlType="submit" onClick={ExpenseFetch}>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  )
};

export default Expense;
