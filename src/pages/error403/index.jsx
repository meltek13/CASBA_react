import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";

const Error403 = ()=>{
    const history = useHistory();

    const back = ()=>{
    history.goBack();
    }
    return (

   <Result
    status="403"
    title="403"
    subTitle="Desolé, mais tu n'est pas autorisé à voir cette page"
    extra={<Button type="primary" onClick={back}>Retour</Button>}
  />

    );
};

export default Error403;
  
