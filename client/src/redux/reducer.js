import {
    GET_BY_NAME,
    GET_DETAILS,
    GET_DRIVERS,
    GET_TEAMS,
    TEAMS_FILTER,
    SORT_DRIVER,
    ORIGINAL_ORDER,
    SORT_DOB,
    CREATE_DRIVER,
    CLEAR_DRIVER_DATA
  } from "./actions";
  
  let initialState = {
    drivers: [],
    driverCopy: [], 
    teams: [],
    details: {},
    filter: "all",
  };
  
  function Reducer(state = initialState, action) {
    switch (action.type) {
      case GET_DRIVERS:
        return {
          ...state,
          drivers: action.payload,
          driverCopy: action.payload, 
        };
      case GET_BY_NAME:
        return {
          ...state,
          drivers: action.payload,
        };

      case CLEAR_DRIVER_DATA:
        return {
          ...state,
          drivers: [],
        };
  
      case GET_DETAILS:
        return {
          ...state,
          details: action.payload,
        };
      case GET_TEAMS:
        return {
          ...state,
          teams: action.payload.slice(0, 20),
        };
      case TEAMS_FILTER:
        if (action.payload === "all") {
          return {
            ...state,
            drivers: state.driverCopy, // Cambio de 'allDrivers' a 'driverCopy'
            filter: action.payload,
          };
        } else {
          // Usar `filter` para filtrar conductores según el equipo
          const filteredDrivers = state.driverCopy.filter((driver) => {
            // Verificar si el conductor pertenece al equipo seleccionado
            return driver.teams.includes(action.payload);
          });
  
          return {
            ...state,
            filter: action.payload,
            drivers: filteredDrivers, // Establecer la lista filtrada de conductores
          };
        }
      case SORT_DRIVER:
        if (action.payload === "aToZ") {
            return {
              ...state,
              drivers: [...state.driverCopy].sort((a, b) =>
                a.name.forename.localeCompare(b.name.forename)
              ),
            };
          }
          if (action.payload === "zToA") {
            return {
              ...state,
              drivers: [...state.driverCopy].sort((a, b) =>
                b.name.forename.localeCompare(a.name.forename) 
              ),
            };
          }
      case ORIGINAL_ORDER:
            return{
                ...state,
                drivers: [...state.driverCopy]
            }
        // reducer.js
    case SORT_DOB:
    const { payload } = action;
    let sortedDob;
  
    if (payload === "asc") {
      // Orden ascendente (más antiguo primero)
      sortedDob = [...state.driverCopy].sort((a, b) => {
        const yearA = parseInt(a.dob.split("-")[0]);
        const yearB = parseInt(b.dob.split("-")[0]);
        return yearA - yearB;
      });
    } else if (payload === "desc") {
      // Orden descendente (más reciente primero)
      sortedDob = [...state.driverCopy].sort((a, b) => {
        const yearA = parseInt(a.dob.split("-")[0]);
        const yearB = parseInt(b.dob.split("-")[0]);
        return yearB - yearA;
      });
    }
  
    return {
      ...state,
      drivers: sortedDob,
    };
    case CREATE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, action.payload],
        driverCopy: [...state.driverCopy, action.payload],
      };
      default:
        return state;
    }
  }
  
  export default Reducer;
  