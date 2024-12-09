import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleVehicles = () => {
  const { uid } = useParams(); // Obtener el uid del vehículo desde la URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(
          `https://www.swapi.tech/api/vehicles/${uid}`
        );
        const data = await response.json();
        setVehicle(data.result.properties || {}); // Guardar las propiedades del vehículo
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [uid]);

  if (loading) return <div>Loading Vehicle Details...</div>;
  if (error) return <div>Error: {error}</div>;

  const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;

  return (
    <div className="container mt-5">
      <h1>{vehicle.name}</h1>
      <div className="card mb-4">
        <img
          src={imageUrl}
          alt={vehicle.name}
          className="card-img-top img-fluid"
          style={{ height: "300px", objectFit: "cover" }}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/placeholder.jpg")
          }
        />
        <div className="card-body">
          <h5 className="card-title">Details</h5>
          <p className="card-text">
            <strong>Model:</strong> {vehicle.model} <br />
            <strong>Manufacturer:</strong> {vehicle.manufacturer} <br />
            <strong>Cost:</strong> {vehicle.cost_in_credits} credits <br />
            <strong>Length:</strong> {vehicle.length} meters <br />
            <strong>Crew:</strong> {vehicle.crew} <br />
            <strong>Passengers:</strong> {vehicle.passengers} <br />
          </p>
        </div>
      </div>
    </div>
  );
};
