import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SinglePlanet = () => {
  const { uid } = useParams();

  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      if (uid) {
        try {
          const planetResponse = await fetch(
            `https://www.swapi.tech/api/planets/${uid}`
          );
          const planetData = await planetResponse.json();

          if (planetData.result) {
            setPlanet(planetData.result.properties);
            setLoading(false);
          } else {
            throw new Error("Planeta no encontrado");
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchPlanet();
  }, [uid]);

  if (loading) {
    return <div className="text-center mt-5">Loading planet details...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;

  return (
    <div className="container mt-5">
      <div className="card mb-3 mx-auto" style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={imageUrl}
              alt={planet.name}
              className="img-fluid rounded-start"
              style={{ height: "300px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h2 className="card-title text-center mb-4">{planet.name}</h2>
                <p className="card-text">
                  <strong>Climate:</strong> {planet.climate} <br />
                  <strong>Terrain:</strong> {planet.terrain} <br />
                  <strong>Population:</strong> {planet.population} <br />
                  <strong>Diameter:</strong> {planet.diameter} km <br />
                  <strong>Gravity:</strong> {planet.gravity} <br />
                  <strong>Orbital Period:</strong> {planet.orbital_period} days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-group">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Planet Details</h5>
            <p className="card-text">
              <strong>Climate:</strong> {planet.climate} <br />
              <strong>Terrain:</strong> {planet.terrain} <br />
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Population & Size</h5>
            <p className="card-text">
              <strong>Population:</strong> {planet.population} <br />
              <strong>Diameter:</strong> {planet.diameter} km <br />
              <strong>Gravity:</strong> {planet.gravity} <br />
              <strong>Orbital Period:</strong> {planet.orbital_period} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
