import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadPlanets();
  }, [actions]);

  if (!store.planets || store.planets.length === 0) {
    return <div className="text-center mt-5">Loading planets...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Star Wars Planets</h1>
      <div className="row">
        {store.planets.map((planet) => {
          return (
            <div className="col-6 col-sm-4 col-md-3 mb-3" key={planet.uid}>
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                  className="card-img-top"
                  alt={planet.name}
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
                  <h6 className="card-title text-truncate">{planet.name}</h6>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/single/planet/${planet.uid}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Learn More
                    </Link>

                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => actions.toggleReadLater(planet)}
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
