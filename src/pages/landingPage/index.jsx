import React from "react";
import "./landingPage.css";
import Home_svg from "assets/img/home.svg";
import Welcome_svg from "assets/img/welcome.svg";
import Colocs_svg from "assets/img/colocs.svg";
import Signup_svg from "assets/img/signup.svg";
import Add_colocs_svg from "assets/img/add_coloc.svg";
import Enjoy_svg from "assets/img/enjoy.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Landing_page = () => {
  const loged = useSelector((state) => state.user.loged);
  const createdColocation = Cookies.get("flat_id");

  return (
    <>
      <div id="container-lp">
        <div id="jumbo-img">
         
          <h1 className="c" id="title-page">
            C 
            
          </h1>
          <h1 className="a" id="title-page">
            a 
          </h1>
          <h1 className="s" id="title-page">
            s 
          </h1>
          <h1 className="b" id="title-page">
            b
          </h1>
          <h1 className="a2" id="title-page">
            a 
          </h1>
          <h1 className="img-effect" id="title-page">
          <img id="img-title" src={Home_svg} alt="illustration" />
          </h1>
          

        </div>
        <hr />
        <div id="container-infos">
          <img id="img-infos" src={Welcome_svg} alt="illustration" />
          <div>
            <h3 id="title-infos">
              Une application qui te facilite la vie au sein de ta collocation
            </h3>
            <br/>
            <p id="text-infos">
              Casba c'est une nouvelle façon de participer, d'échanger et de
              partager <br />
              de bons moments avec tes colocataires tout en restant au courant
              de ce qui se passe dans la collocation. <br />
              Grace aux outils de l'application tu pourras:{" "}
            </p>
            <br/>
            <ul>
              <li>
                <strong>Gérer et suivre les dépenses</strong> (courses,
                factures...)
              </li>
              <li>
                <strong>Poster des photos</strong>{" "}
              </li>
              <li>
                <strong> Mettre un évennement dans le calendrier commun</strong>
              </li>
            </ul>
          </div>
          <br/>
          {loged ? (
            !Cookies.get("flat_id") && (
              <div id="btn-cta-group">
                <Link to="/new_flat_sharing">
                  <button className="btn-cta-blue">
                    Créer une collocation
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div id="btn-cta-group">
              <Link to="/sign_up">
                <button className="btn-cta-blue">S'inscrire </button>
              </Link>
              <Link to="/sign_in">
                <button className="btn-cta">Se connecter</button>
              </Link>
            </div>
          )}
          {createdColocation ? (
            <Link to="/expense">
              <button className="btn-cta-blue">Créer une dépense</button>
            </Link>
          ) : (
            ""
          )}
        </div>

        <div>
        <br/>
          <hr />
          <br/>
          <div id="container-cards-infos">
            <h2 id="title-cards-infos"> Comment ça marche? </h2>
            <br/>

            <div className="container-cards">
              {/*------------Card-----------------*/}
              <div className="card-infos">
                <div className="img-text-card">
                  <img src={Signup_svg} alt="illustration" />
                </div>
                <p className="title-card">Inscris toi</p>
              </div>
              {/*------------Card-----------------*/}
              <div className="card-infos">
                <div className="img-text-card">
                  <img src={Add_colocs_svg} alt="illustration" />
                </div>
                <p className="title-card">Crée ou trouve ta colocation</p>
              </div>
              {/*------------Card-----------------*/}
              <div className="card-infos">
                <div className="img-text-card">
                  <img src={Colocs_svg} alt="illustration" />
                </div>
                <p className="title-card">
                  Invite ou rejoins tes colocataires{" "}
                </p>
              </div>
              {/*------------Card-----------------*/}
              <div className="card-infos">
                <div className="img-text-card">
                  <img src={Enjoy_svg} alt="illustration" />
                </div>
                <p className="title-card">Profites avec tes colocs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing_page;
