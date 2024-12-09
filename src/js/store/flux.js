const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        { title: "FIRST", background: "white", initial: "white" },
        { title: "SECOND", background: "white", initial: "white" },
      ],
      characters: [], // Lista de personajes
      planets: [], // Lista de planetas
      vehicles: [], // Lista de vehículos
      readLater: [], // Lista de favoritos (personajes, planetas, y vehículos)
    },
    actions: {
      // Cargar personajes con detalles
      loadCharacters: async () => {
        const store = getStore();
        if (store.characters.length === 0) {
          try {
            const response = await fetch(
              "https://www.swapi.tech/api/people?page=1&limit=20"
            );
            const data = await response.json();

            if (data && data.results) {
              const charactersWithDetails = await Promise.all(
                data.results.map(async (character) => {
                  const characterId = character.url.split("/")[5];
                  const detailsResponse = await fetch(
                    `https://www.swapi.tech/api/people/${characterId}`
                  );
                  const detailsData = await detailsResponse.json();
                  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

                  return {
                    uid: characterId,
                    name: detailsData.result.properties.name || "Unknown",
                    image: imageUrl,
                    ...detailsData.result.properties,
                  };
                })
              );
              setStore({ characters: charactersWithDetails });
            }
          } catch (error) {
            console.error("Error al cargar personajes:", error.message);
          }
        }
      },

      loadPlanets: async () => {
        const store = getStore();
        if (store.planets.length === 0) {
          try {
            const response = await fetch(
              "https://www.swapi.tech/api/planets?page=1&limit=20"
            );
            const data = await response.json();

            if (data && data.results) {
              const planetsWithDetails = await Promise.all(
                data.results.map(async (planet) => {
                  const planetId = planet.url.split("/")[5];
                  const detailsResponse = await fetch(
                    `https://www.swapi.tech/api/planets/${planetId}`
                  );
                  const detailsData = await detailsResponse.json();
                  const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;

                  return {
                    uid: planetId,
                    name: detailsData.result.properties.name || "Unknown",
                    image: imageUrl,
                    ...detailsData.result.properties,
                  };
                })
              );
              setStore({ planets: planetsWithDetails });
            }
          } catch (error) {
            console.error("Error al cargar planetas:", error.message);
          }
        }
      },

      loadVehicles: async () => {
        const store = getStore();
        if (store.vehicles.length === 0) {
          try {
            const response = await fetch(
              "https://www.swapi.tech/api/vehicles?page=1&limit=10"
            );
            const data = await response.json();

            if (data && data.results) {
              const vehiclesWithDetails = await Promise.all(
                data.results.map(async (vehicle) => {
                  const vehicleId = vehicle.url.split("/")[5];
                  const detailsResponse = await fetch(
                    `https://www.swapi.tech/api/vehicles/${vehicleId}`
                  );
                  const detailsData = await detailsResponse.json();
                  const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`;

                  return {
                    uid: vehicleId,
                    name: detailsData.result.properties.name || "Unknown",
                    image: imageUrl,
                    ...detailsData.result.properties,
                  };
                })
              );
              setStore({ vehicles: vehiclesWithDetails });
            }
          } catch (error) {
            console.error("Error al cargar vehículos:", error.message);
          }
        }
      },

      // Agregar o quitar elementos de favoritos
      toggleReadLater: (item) => {
        const store = getStore();
        const isFavorite = store.readLater.some((fav) => fav.uid === item.uid);

        if (isFavorite) {
          setStore({
            readLater: store.readLater.filter((fav) => fav.uid !== item.uid),
          });
          console.log("Elemento eliminado de favoritos:", item.name);
        } else {
          setStore({ readLater: [...store.readLater, item] });
          console.log("Elemento agregado a favoritos:", item.name);
        }
      },

      removeFromReadLater: (uid) => {
        const store = getStore();
        setStore({
          readLater: store.readLater.filter((fav) => fav.uid !== uid),
        });
        console.log("Elemento eliminado de favoritos por UID:", uid);
      },
    },
  };
};

export default getState;
