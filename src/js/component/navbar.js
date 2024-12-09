import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo} // Ruta de la imagen que subiste
            alt="Star Wars Logo"
            style={{ width: "50px", height: "auto" }} // Ajuste de tamaño
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/persons">
                Persons
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planets">
                Planets
              </Link>
            </li>
            {/* Opción de Vehicles añadida */}
            <li className="nav-item">
              <Link className="nav-link" to="/vehicles">
                Vehicles
              </Link>
            </li>
          </ul>
          <ul
            className="navbar-nav ms-auto"
            style={{ marginRight: "60px" }} // Aplica el margen directamente
          >
            <li className="nav-item dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites
                {/* Mostrar el número de elementos en el dropdown */}
                <span className="badge bg-danger ms-2">
                  {store.readLater.length}
                </span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ width: "200px" }}
              >
                {store.readLater.length > 0 ? (
                  store.readLater.map((character) => (
                    <li
                      key={character.uid}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <button className="dropdown-item" type="button">
                        {character.name}
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => actions.toggleReadLater(character)}
                        title="Remove from Favorites"
                      >
                        <i className="bi bi-trash3"></i>{" "}
                      </button>
                    </li>
                  ))
                ) : (
                  <li>
                    <button className="dropdown-item" type="button">
                      (Empty)
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
