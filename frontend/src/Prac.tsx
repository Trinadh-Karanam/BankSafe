import {useState} from "react";
import "./App.css";
import type { SuperHero, SuperHeroCardProps } from "./types";

const originSuperHeroes: SuperHero[] = [
    { rank: 2, name: "Superman", power: "Flight" },
    { rank: 30, name: "Batman", power: "Intelligence" },
    { rank: 77, name: "Wonder Woman", power: "Women" },
];  


function SuperHeroCard({ hero, onPromote }: SuperHeroCardProps) {
  return (
    <article className="employee-card">
      <div>
        <h3>{hero.name}</h3>
        <p className="employee-role">{hero.power}</p>
      </div>

      <div className="employee-actions">
        <span className={`status status-${hero.power.toLowerCase()}`}>
          {hero.power}
        </span>

        <button
          onClick={() => onPromote(hero.rank)}
          disabled={hero.power === "Women"}
        >
          {hero.power === "None" ? "No use" : "Worthy"}
        </button>
      </div>
    </article>
  );
}


function Prac(){
    const [superHeroes, setSuperHeroes] = useState<SuperHero[]>(originSuperHeroes);
    const [searchText, setSearchText] = useState<string>("");

    function promoteSuperHero(heroRank: number): void {
        setSuperHeroes((currentSuperHeroes) =>
            currentSuperHeroes.map((hero) =>
                hero.rank === heroRank
                    ? { ...hero, power: "Part of Justice league" } : hero
            )
        );
    }

    const filteredSuperHeroes = superHeroes.filter((hero) =>
        hero.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <div className="App">
            <h1>Super Heroes</h1>  
            
        <div className="employee-list">
          {filteredSuperHeroes.length > 0 ?(
            filteredSuperHeroes.map((hero) => (
              <SuperHeroCard
                key={hero.rank}
                hero={hero}
                onPromote={promoteSuperHero}
              />
            ))
          ) : (
            <p className="empty-message">No super heroes found.</p>
          )}
        </div>
            </div>)

}

export default Prac;