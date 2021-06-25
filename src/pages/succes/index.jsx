import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

const Succes = () => {
  const history = useHistory();
  const { email } = useParams();

  const backLastPage = () => {
    history.goBack();
  };
  const backdashboard = () => {
    history.push('/');
  };

  return (
    <div>
      {email === 'bad-request'
        ? (
          <Result
            status="warning"
            title="Une erreur est survenue"
            subTitle="Il semble que le mail indiqué ne soit pas valide"
            extra={(
              <Button type="primary" key="console" onClick={backLastPage}>
                Retour
              </Button>
    )}
          />
        )
        : (
          <Result
            status="success"
            title="Email envoyé"
            subTitle={`Une invitation à été envoyé à ${email}`}
            extra={[
              <Button type="primary" key="back" onClick={backLastPage}>
                Ajouter un autre collocataire
              </Button>,
              <Button type="primary" key="dashboard" onClick={backdashboard}>
                Retour au dashboard
              </Button>,
            ]}
          />
        )}
    </div>
  );
};

export default Succes;
