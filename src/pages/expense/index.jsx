import React, { useState, useEffect } from 'react';
import 'pages/expense/expense.css';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import Expense_svg from 'assets/img/money_colocs.svg';
import url from 'data/url.json';
import { Notif_sucess_expense, Notif_error_expense } from 'components/Notifications';
import {
  Form, Input, Button, Select, InputNumber, Checkbox, Row, Col,
} from 'antd';

import CheckboxDisplay from 'components/checkbox';

const Expense = () => {
  const [titleInput, settitleInput] = useState('');
  const [dateOfExpenseInput, setDateOfExpenseInput] = useState('');
  const [totalAmountInput, setTotalAmountInput] = useState('');
  const input_total_corrected = totalAmountInput.replace(',', '.');
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
    fetch(`${url.url}flatsharings/${id}/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        setFlatMates(response);
      });
  };

  useEffect(() => {
    findFlatMates();
  }, []);

  const ExpenseFetch = (e) => {
    if (titleInput.length < 1 || input_total_corrected.length < 1 || concernedColocsInput2.length < 1) {
      Notif_error_expense();
    } else {
      fetch(`${url.url}expenses`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expense: {
            id_expense: Math.random().toString(20).substr(2),
            title: titleInput,
            date_of_expense: dateOfExpenseInput,
            total_amount: input_total_corrected,
            concerned_colocs: concernedColocsInput2,
            user_id: Cookies.get('current_user_id'),
            flatsharing_id: Cookies.get('flat_id'),
            split_amount_to_colocs: (input_total_corrected / (concernedColocsInput2.length)),
          },
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          updateSoldePositif(response);
         
        });
      
    }
  };

  const deleteFlatMate = (flatmate) => {
    const array = [];
    concernedColocsInput2.forEach((x) => {
      if (x !== flatmate) {
        array.push(x);
      }
    });
    setConcernedColocsInput2([]);
    array.forEach((x) => {
      setConcernedColocsInput2((oldArray) => [...oldArray, x]);
    });
  };

  const updateSoldePositif = (expense) => {
    fetch(`${url.url}members/${expense.expense.user_id}`, {
      method: 'get',
      headers: {
        Authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const formData = new FormData();
        formData.append('solde', response.solde + expense.expense.total_amount);
        fetch(`${url.url}members/${expense.expense.user_id}`, {
          method: 'PUT',
          body: formData,
        })
          .catch((error) => console.log(error))
          .then((response) => {
            updateSoldeNegatif(expense);
          });
      });
  };

  const updateSoldeNegatif = (expense) => {
    expense.expense.concerned_colocs.forEach((colloc_id) => {
      fetch(`${url.url}members/${colloc_id}`, {
        method: 'get',
        headers: {
          Authorization: Cookies.get('token'),
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const formData = new FormData();
          formData.append('solde', response.solde - expense.expense.split_amount_to_colocs);
          fetch(`${url.url}members/${colloc_id}`, {
            method: 'PUT',
            body: formData,
          })
            .catch((error) => console.log(error))
            .then((response) => {

              Notif_sucess_expense();
              window.location.reload(false);

              
            });
        });
    });
  };

  return (
    <>
      <h1>Les d??penses</h1>
      <h2>
        Les bons comptes font les bons collocs
      </h2>
      <div id="container_expense">
        <img id="expense-svg" src={Expense_svg} alt="illustration tirelire cochon " />
        
        <Form {...layout} name="control-ref" className="expense-form">
          <h2>Course, factures ... rentre tes depenses ici</h2>
          <muted>(On s'occupe des calculs !)</muted>
          <br/>
          <div className="TitleexpenseForm">
          <span className="colorBlue" >Intitul?? de la d??pense </span>
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
          </div>
          <div className="TitleexpenseForm">
          <span className="colorBlue">Montant ? </span>
          <Form.Item
            name="montant"
            label=""
            onChange={(event) => setTotalAmountInput(event.target.value)}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          </div>
          <span className="colorBlue">Pour qui ?</span>
          <div className="TitleexpenseForm borderCheckBox">
          
          <Form.Item name="checkbox-group" label="">
            <Checkbox.Group> <br></br>
              {flatMates?.admin ? (
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value={flatMates.admin.id}
                      onChange={(e) => (e.target.checked ? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]) : deleteFlatMate(e.target.value))}
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      {flatMates.admin.nickname ? flatMates.admin.nickname :flatMates.admin.email}
                    </Checkbox>
                  </Col>
                </Row>
              ) : <p>non</p>}
             
              {flatMates?.guest?.map( user => user ? (
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value={user.id}
                      onChange={(e) => (e.target.checked ? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]) : deleteFlatMate(e.target.value))}
                      style={{
                        lineHeight: '32px',
                      }}
                    >
                      {user.nickname ? user.nickname  :user.email} 
                    </Checkbox>
                  </Col>
                </Row>
              ) : <span />)}
            </Checkbox.Group>
          </Form.Item>
          </div>
          
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={ExpenseFetch}>
              Enregistrer
            </Button>
          </Form.Item>
          
          
        </Form>
        </div>
      
    </>
  );
};

export default Expense;
