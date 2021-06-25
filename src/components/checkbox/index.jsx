import React, { useState } from 'react';

import {
  Form, Input, Button, Select, InputNumber, Checkbox, Row, Col,
} from 'antd';

const CheckboxDisplay = ({ flatmate }) => {
  const [concernedColocsInput2, setConcernedColocsInput2] = useState([]);

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

  return (
    <Row>
      <Col span={8}>
        <Checkbox
          value={flatmate.id}
          onChange={(e) => (e.target.checked ? setConcernedColocsInput2((oldArray) => [...oldArray, e.target.value]) : deleteFlatMate(e.target.value))}
          style={{
            lineHeight: '32px',
          }}
        >
          {flatmate.email}
        </Checkbox>
      </Col>
    </Row>
  );
};

export default CheckboxDisplay;
