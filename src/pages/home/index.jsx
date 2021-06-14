import React from "react"
import { Link } from "react-router-dom";

const Home =()=>{

    return (
        <div> 
             <h1>Bienvenue sur CASBA</h1>
             <p>CASBA est un site qui v'as t'aider à organiser ta colloc, c'est simple <Link to="/sign_up"> inscris toi </Link> ou  <Link to="/sign_in">
             connect toi</Link> si tu as déjà un compte,</p>
             <p>ensuite soit tu créer une nouvelle collocation, soit t'en rejoins une (on t'enverras un lien dans ce cas là)</p>
             <p>Accède à des tas d'outils que nous concoctons specialement pour toi !</p>

             <div>Calendrier</div>
             <div>Tricount</div>
             <div>Photos</div>
             <div>Mets à jour ton status</div>
             <div>Laches tes commaitaires</div>
             <Link to="/new_flat_sharing">Créér une nouvelle collocation</Link>
        </div>
       
    )
}

export default Home