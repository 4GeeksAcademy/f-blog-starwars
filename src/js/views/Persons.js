import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Persons = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadCharacters();
  }, [actions]);

  if (!store.characters || store.characters.length === 0) {
    return <div className="text-center mt-5">Loading characters...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Star Wars Characters</h1>
      <div className="row">
        {store.characters.map((character) => {
          return (
            <div className="col-6 col-sm-4 col-md-3 mb-3" key={character.uid}>
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                  className="card-img-top"
                  alt={character.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://starwars-visualguide.com/assets/img/placeholder.jpg")
                  }
                  style={{
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h6 className="card-title text-truncate">{character.name}</h6>
                  <p className="card-text mb-2">
                    <strong>Gender:</strong> {character.gender} <br />
                    <strong>Birth Year:</strong> {character.birth_year} <br />
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/single/person/${character.uid}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Learn More
                    </Link>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => actions.toggleReadLater(character)}
                    >
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
