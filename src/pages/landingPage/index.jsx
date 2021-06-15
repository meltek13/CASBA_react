import React from 'react';
import './landingPage.css';
import Home_svg from 'assets/img/home.svg';
import Welcome_svg from 'assets/img/welcome.svg';
import Colocs_svg from 'assets/img/colocs.svg';
import Signup_svg from 'assets/img/signup.svg';
import Add_colocs_svg from 'assets/img/add_coloc.svg';
import Enjoy_svg from 'assets/img/enjoy.svg';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const Landing_page = () => {

  const loged = useSelector((state) => state.loged);

  return(
    <>
      <div id="container-lp">
        <div id="jumbo-img">
          
          <h1 id="title-page">Bienvenue sur  
            Casba <img id="img-title" src={Home_svg} alt="illustration" />
            </h1>
        </div>
        <hr />
        <div id="container-infos">
          <img id="img-infos" src={Welcome_svg} alt="illustration" />
          <div>
              <h3 id="title-infos">Une application qui te facilite la vie au sein de ta cohabitation</h3>
              <p id="text-infos">Casba c'est une nouvelle façon de participer, d'échanger et de partager <br />
              de bons moments avec tes colocataires tout en restant au courant de ce qui se passe dans la collocation. <br />
              Grace aux outils de l'application tu pourras: </p>
                <ul>
                  <li>gérer et <strong>suivre les dépenses</strong> (courses, factures...)</li>
                  <li><strong>poster des photos</strong> </li>
                  <li><strong> mettre un évennement dans le calendrier</strong> commun</li>
                </ul> 
            </div>      
            {loged ?(
              <div id="btn-cta-group">
                <Link to="/new_flat_sharing"><button className="btn-cta">Créer une collocation</button></Link>
              </div>
              ) : (
                <div id="btn-cta-group">
                  <Link to="/sign_up"><button className="btn-cta">S'inscrire</button></Link>
                  <Link to="/sign_in"><button className="btn-cta">Se connecter</button></Link>
                  <Link to="/new_flat_sharing"><button className="btn-cta">Créer une collocation</button></Link>
                </div>
              )
            }
          </div>

        <div>
        <hr />
          <div id="container-cards-infos">
            <h3 id="title-cards-infos"> Comment ça marche? </h3>
        
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
                <p className="title-card">Crées ou trouves ta colocation</p>
                
              </div>
              {/*------------Card-----------------*/}
              <div className="card-infos">
                <div className="img-text-card">
                  <img src={Colocs_svg} alt="illustration" />
                </div>
                <p className="title-card">Invite ou rejoint tes colocataires </p>
                
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
  )
}

export default Landing_page;