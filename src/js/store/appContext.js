import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {
      // Cargar personajes
      if (state.actions.loadCharacters) {
        state.actions.loadCharacters();
      } else {
        console.error("loadCharacters action is not defined");
      }

      // Cargar planetas
      if (state.actions.loadPlanets) {
        state.actions.loadPlanets();
      } else {
        console.error("loadPlanets action is not defined");
      }

      // Cargar vehículos
      if (state.actions.loadVehicles) {
        state.actions.loadVehicles();
      } else {
        console.error("loadVehicles action is not defined");
      }
    }, []);

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
