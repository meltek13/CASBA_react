import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Add_colocs_svg from "assets/img/add_coloc.svg";
import "./new_flatSharing.css";
import url from "data/url.json"
import { useDispatch} from "react-redux";
import { connect } from "store-redux/room";


const NewFlatSharing = () => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const admin_id = Cookies.get("current_user_id");
  const { TextArea } = Input;
  const [email, setEmail] = useState("");
  

  const verifyEmail = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return "success";
    } else if (email.length === 0) {
      return "";
    } else {
      return "error";
    }
  };

  const fetchFunction = (array_email_invitation) => {
    fetch(url.url + "flatsharings", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flatsharing: {
          title: title,
          description: description,
          admin_id: admin_id,
          pending_invitation: array_email_invitation,
        },
      }),
    })
      .then((response) => response.json())
      .then((userdata) => {
      
        console.log(userdata)
        Cookies.set("flat_id", userdata.flatsharing.id);  
        dispatch(connect()) 
        associateFlatToAdmin( userdata.flatsharing.id)
        history.push("/dashboard/" + userdata.flatsharing.id);
      })
    
  };
  const associateFlatToAdmin = (Id_flat) => {
  
    const formData = new FormData();
      formData.append("flatsharing_id", Id_flat);

    fetch(url.url + "members/" + Cookies.get("current_user_id"), {
      method: "PUT",
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
      });
  };

  const SetEmailRoomMate = (values) => {
    const array_email_invitation = [];
    if (values.users !== undefined){
      values.users.forEach((roommate) =>
      array_email_invitation.push(roommate.email)
    );
    }
    
    fetchFunction(array_email_invitation);
  };
 const test = (e) => {
   console.log(e.target.value)
 }
  return (
    <div>
      <img id="page-svg" src={Add_colocs_svg} alt="illustration" />
      <h1 className="create-flatsharing">Créer une nouvelle collocation</h1>
      <Form
        name="dynamic_form_nest_item"
        onFinish={SetEmailRoomMate}
        autoComplete="off"
      >
        <h4>Comment voulez vous appeler votre colloc ?</h4>
        <Input
          placeholder="Le nom de votre collocation"
          value={title}
          rules={[{ required: true, message: "Quel est le nom de votre colloc ?" }]}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <h4>Décrivez en quelques mots votre "chez-vous" </h4>
        <TextArea
          placeholder="Description ..."
          value={description}
          rules={[{ required: true, message: "Une petite description" }]}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <br />
        <br />
        <h4>Invitez vos collocataires à rejoindre Casba</h4>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: "flex" }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    validateStatus={verifyEmail()}
                    onChange={verifyEmail()}
                    onChange={(e) => setEmail(e.target.value)}
                    fieldKey={[fieldKey, "email"]}
                    rules={[{ required: false, message: "email manquant" }]}
                  >
                    <Input placeholder="Jean@gmail.com" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Ajouter un collocataire
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Creer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewFlatSharing;
