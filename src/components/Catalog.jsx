import { useEffect, useState } from "react"
import "./Catalog.css"

export default function Catalog() {
    const [error, setError] = useState(null)
    const [character, setCharacter] = useState([]);
    const fetchUrl = "https://raw.githubusercontent.com/akabab/starwars-api/master/api/all.json"
    
    useEffect(function() {
        async function fetchData() {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error("Star Wars character cannot be fetched.")
                }
                const data = await response.json();
                setCharacter(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="body-wrapper">
            <h1>Toto je katalog postav</h1>
            {error && <p className="error-message">{error}</p>}

            <div className="character-grid">
                {character.map((postava) => {
                    return (
                        <div key={postava.id} className="character-card">
                            <h2>Jméno: <span className="value">{postava.name}</span></h2>
                            <h2>Druh: <span className="value">{postava.species}</span></h2>
                            <h2>Domovina: <span className="value">{postava.homeworld}</span></h2>
                            <img src={postava.image} alt={postava.name} />
                        </div>
                    )
                })};
            </div>
        </div>
    )
}