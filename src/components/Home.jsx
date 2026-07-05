import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
    return (
        <div className="home-container">
            <h1>Galaktický Holocron</h1>
            <p className="home-subtitle">
                Vítej v zabezpečeném archivu, který shromažďuje fragmenty vědění z celé galaxie. 
                Od prašných dun Tatooine až po zářící mrakodrapy Coruscantu, tento Holocron 
                ukrývá data o těch nejvýznamnějších entitách naší éry. 
                Prozkoumej citlivé záznamy o mistrech Jedi, nelítostných sithských lordech, 
                odvážných pašerácích i nevyzpytatelných námezdních lovcích, jejichž činy utvářely 
                osud tisíců světů. Pamatuj, že vědění je mnohdy mocnější než jakákoliv zbraň.
                <br />
                <br />
                Přístup do databází ti byl udělen. Nechť tě při zkoumání galaktické historie provází Síla.
            </p>
            <Link to="/Catalog" className="enter-button">
                Prozkoumat záznamy
            </Link>
        </div>
    )
}