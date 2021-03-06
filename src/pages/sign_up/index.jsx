import { React, useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from 'store-redux/index';
import { connect } from 'store-redux/room';
import './sign_up.css';

import {
  Form, Input, Button, Checkbox, Alert,
} from 'antd';
import url from 'data/url.json';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 20,
    },
  };

  const verifyPassword = () => {
    if (password.length < 6 && password.length > 0) {
      return 'error';
    }
    return 'success';
  };
  const verifyConfirmationPassword = () => {
    if (confirmPassword !== password) {
      return 'error';
    }
    return 'validating';
  };

  const verifyEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return 'success';
    } if (email.length === 0) {
      return '';
    }
    return 'error';
  };

  const findFlat = (user_id) => {
    fetch(`${url.url}flatsharings`, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((flat) => {
          flat.flat_mate.forEach((mate) => {
            if (mate !== null) {
              if (mate.id === parseInt(user_id)) {
                Cookies.set('flat_id', flat.id);
                dispatch(connect());
                history.push(`/dashboard/${flat.id}`);
              }
            }
          });
        });
      });
  };

  const createUser = (e) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (confirmPassword === password && re.test(email)) {
      const data = {
        email,
        password,
      };

      fetch(`${url.url}users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      })
        .then((response) => {
          Cookies.set('token', response.headers.get('authorization'));
          return response.json();
        })
        .then((userdata) => {
          if (Cookies.get('token') === 'null') {
            if (userdata.exception.includes('UniqueViolation')) {
              document
                .querySelector('.invisible2')
                .classList.remove('invisible2');
            } else {
              document
                .querySelector('.invisible')
                .classList.remove('invisible');
            }
          } else {
            Cookies.set('current_user_id', userdata.user.id);
            dispatch(logIn());
            findFlat(Cookies.get('current_user_id'));
            history.push('/');
          }
        });
    }
  };

  return (
    <div className="center">
      <div className="Register">
        <Alert
          className="invisible2"
          message="cet email est d??j?? associ?? ?? un compte"
          type="warning"
          showIcon
          closable
        />
        <Alert
          className="invisible"
          message="Mot de passe ou email invalide"
          type="error"
          showIcon
          closable
        />
        <h1>Inscription</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={createUser}
        >
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            validateStatus={verifyEmail()}
            value={email}
            onChange={verifyEmail()}
            onChange={(e) => setEmail(e.target.value)}
            rules={[
              {
                required: true,
                message: 'Email invalide',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateStatus={verifyPassword()}
            onChange={verifyPassword()}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                required: true,
                message: 'Mot de passe invalide',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            className="btnConfirmPassword"
            label="Confirmer"
            validateStatus={verifyConfirmationPassword()}
            name="confirmation password"
            value={confirmPassword}
            onChange={verifyConfirmationPassword()}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rules={[
              {
                required: true,
                message: 'Mot de passe invalide',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              S'inscrire
            </Button>
            <br />
            <br />
            <p>
              D??j?? inscrit ?
              {' '}
              <Link to="/sign_in">connectez-vous</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
