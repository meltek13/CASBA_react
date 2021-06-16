import { React, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { logIn } from "store-redux";
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Add_colocs_svg from 'assets/img/add_coloc.svg';
import './new_flatSharing.css';

const NewFlatSharing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const loged = useSelector((state) => state.loged);
  const admin_id = Cookies.get("current_user_id")
  const { TextArea } = Input;
  const fetchFunction = (array) => {
  
    fetch("http://localhost:3000/flatsharings", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flatsharing: {
          title: title,
          description: description,
          admin_id: admin_id,
          pending_invitation: array
        },
      }),
    })
      .then((response) => response.json())
      .then((userdata) => {
          console.log(userdata);
          history.push("/dashboard/" + userdata.flatsharing.id);
      });
  };



const SetEmailRoomMate = values => {
  const array = []
  values.users.forEach(roommate => array.push(roommate.email))
  fetchFunction(array)
}

 
 

  return (

<div>
<img id="page-svg" src={Add_colocs_svg} alt="illustration" />
<h1 className="create-flatsharing">Créer une nouvelle collocation</h1>
    <Form name="dynamic_form_nest_item" onFinish={SetEmailRoomMate} autoComplete="off">
      <h4>Comment voulez vous appeler votre colloc ?</h4>
    <Input placeholder="Le nom de votre collocation"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
    />
    <br/>
    <br/>
      <h4>Décrivez en quelques mots votre "chez-vous" </h4>
      <TextArea 
      placeholder="Description ..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={3} />
     <br/>
     <br/>
    <h4>Invitez vos collocataires à rejoindre Casba</h4>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex' }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'email']}
                  fieldKey={[fieldKey, 'email']}
                  rules={[{ required: true, message: 'email manquant' }]}                 
                >
                  
                  <Input placeholder="Jean@gmail.com" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
            
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Ajouter un collocataire 
              </Button>
           
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Creer 
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default NewFlatSharing;
