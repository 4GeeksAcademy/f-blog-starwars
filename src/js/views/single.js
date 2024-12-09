import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
  const { store } = useContext(Context);
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);

  const character = store.characters.find((character) => character.uid === uid);

  useEffect(() => {
    const fetchPlanet = async () => {
      if (character && character.homeworld) {
        try {
          const planetResponse = await fetch(character.homeworld);
          const planetData = await planetResponse.json();
          setPlanet(planetData.result.properties.name);
        } catch (error) {
          console.error("Error fetching homeworld:", error);
        }
      }
    };

    fetchPlanet();
  }, [character]);

  if (!character) {
    return <div>Character not found</div>;
  }

  // Descripción personalizada del personaje
  const characterDescription = `${character.name} es un ${character.gender} que nació en el año ${character.birth_year}. Es conocido por su ${character.eye_color} y su altura de ${character.height} cm.`;

  return (
    <div className="container mt-5">
      <div className="card mb-3 mx-auto" style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={
                character.image ||
                "https://starwars-visualguide.com/assets/img/placeholder.jpg"
              }
              className="img-fluid rounded-start"
              alt={character.name}
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h2 className="card-title text-center mb-4">
                  {character.name}
                </h2>
                <p className="card-text">
                  <strong>Gender:</strong> {character.gender} <br />
                  <strong>Birth Year:</strong> {character.birth_year} <br />
                  <strong>Eye Color:</strong> {character.eye_color} <br />
                  <strong>Height:</strong> {character.height} cm <br />
                  <strong>Mass:</strong> {character.mass} kg <br />
                  <strong>Skin Color:</strong> {character.skin_color} <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-group">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Character Description</h5>
            <p className="card-text">{characterDescription}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Homeworld</h5>
            <p className="card-text">{planet || "Loading..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
