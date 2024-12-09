import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Vehicles = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadVehicles();
  }, [actions]);

  if (!store.vehicles || store.vehicles.length === 0) {
    return <div className="text-center mt-5">Loading vehicles...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Star Wars Vehicles</h1>
      <div className="row">
        {store.vehicles.map((vehicle) => {
          return (
            <div className="col-6 col-sm-4 col-md-3 mb-3" key={vehicle.uid}>
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                  className="card-img-top"
                  alt={vehicle.name}
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
                  <h6 className="card-title text-truncate">{vehicle.name}</h6>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/single/vehicle/${vehicle.uid}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Learn More
                    </Link>

                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => actions.toggleReadLater(vehicle)}
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
