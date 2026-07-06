import { useEffect, useState } from "react"
import "./Catalog.css"

// Definice stavů
export default function Catalog() {
    const [error, setError] = useState(null)
    const [character, setCharacter] = useState([]);
    const [activeCategory, setActiveCategory] = useState('všichni');
    const fetchUrl = "https://raw.githubusercontent.com/akabab/starwars-api/master/api/all.json"

    // Fetch dat
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
    }, []); //* Pole závislostí [] -> když je prázdné, tak funkce na ničem nezávisí -> 
            //* tzn. spustí se pouze jednou a to jen při prvním načtení stránky / komponenty, 
            //* jinak by se data stahovala neustále při každém kliknutí na tlačítko

            //* PS.: Když tam bude závislost, tak se spustí, když se změní jedna z proměnných (závislostí) uvnitř

    //* postava = parametr funkce (vymýšlím si ho sám)
    //* Vezme první záznam, pojmenuje si ho dočasně postava, zkontroluje if/else 
    //* a propustí dál, veme druhý záznam, pojmenuje ho postava a znovu
    const filteredCharacters = character.filter((postava) => { 
        if (activeCategory === 'všichni') {
            return true;
        } else if (activeCategory === 'jedi') {
            return postava.affiliations?.includes("Jedi Order"); 
            //* = Optional Chaining (?.) - některé postavy třeba vůbec nemají affiliations (zvířata např.)
        } else if (activeCategory === 'sith') {
            return postava.affiliations?.includes('Sith'); 
            //* Pokud by tam ? nebyl, JS by se snažil udělat metodu includes() na něčem, co neexistuje a aplikace by spadla
        } else if (activeCategory === 'droid') {
            return postava.species?.includes('droid') 
            //* Říká: zkus se podívat do species, jestli to ta postava vůbec má, pokud ne, 
            //* vrať false a dál se ani nesnaž nic hledat, aby to nespadlo
        } else if (activeCategory === 'others') {
            return !postava.affiliations?.includes('Jedi Order') && 
                    !postava.affiliations?.includes('Sith') &&
                    !postava.species?.includes('droid');
        } else {
            return false;
        }
    });

    // Tělo komponenty
    return (
        <div className="body-wrapper">
            <h1>Toto je katalog postav</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="buttons">
                <button onClick={() => setActiveCategory('všichni')} className={activeCategory === 'všichni' ? 'active' : ''}>Všichni</button>
                <button onClick={() => setActiveCategory('jedi')} className={activeCategory === 'jedi' ? 'active' : ''}>Jediové</button>
                <button onClick={() => setActiveCategory('sith')} className={activeCategory === 'sith' ? 'active' : ''}>Sithové</button>
                <button onClick={() => setActiveCategory('droid')} className={activeCategory === 'droid' ? 'active' : ''}>Droidi</button>
                <button onClick={() => setActiveCategory('others')} className={activeCategory === 'others' ? 'active' : ''}>Ostatní</button>
            </div>

            

            <div className="character-grid">
                {filteredCharacters.map((postava) => {
                    return (
                        <div key={postava.id} className="character-card">
                            <h2>Jméno: <span className="value">{postava.name}</span></h2>
                            <h2>Druh: <span className="value">{postava.species}</span></h2>
                            <h2>Domovina: <span className="value">{postava.homeworld}</span></h2>
                            <img src={postava.image} alt={postava.name} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}