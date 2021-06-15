import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { logIn } from "store-redux";
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const NewFlatSharing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roomMate, setRoomMate] = useState([]);
  const history = useHistory();
  const loged = useSelector((state) => state.loged);
  const admin_id = Cookies.get("current_user_id")


const SetEmailRoomMate = values => {
  
  values.users.forEach(roommate => setRoomMate(oldArray => [...oldArray, roommate.email]))
  
  console.log(roomMate)
  fetchFunction()
}

  const fetchFunction = (e) => {
    
    
    const data = {
      title,
      description,
      admin_id,
    };

    fetch("http://localhost:3000/flatsharings", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flatsharing: {
          title: data.title,
          description: data.description,
          admin_id: data.admin_id,
        },
      }),
    })
      .then((response) => response.json())
      .then((userdata) => {
          console.log(userdata);
          history.push("/");
      });
  };

  return (

<div>
<h2 className="create-flatsharing">Créer une nouvelle collocation</h2>
    <Form name="dynamic_form_nest_item" onFinish={SetEmailRoomMate} autoComplete="off">
      <h4>Comment voulez vous appeler votre colloc ?</h4>
    <Input placeholder="Le nom de votre collocation"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
    />
      <h4>Décrivez en quelques mots votre "chez-vous" </h4>
    <Input placeholder="Description"
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     />
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
                  <Input placeholder="Envoyer une invitation à" />
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
