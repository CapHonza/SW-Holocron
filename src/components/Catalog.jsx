import { useEffect, useState } from "react"

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
        <div>
            <h2>Toto je katalog postav</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="character-grid">
                {character.map((postava) => {
                    return (
                        <div key={postava.id} className="character-card">
                            <h2>Jméno: {postava.name}</h2>
                            <img src={postava.image} alt={postava.name} />
                        </div>
                    )
                })};
            </div>
        </div>
    )
}