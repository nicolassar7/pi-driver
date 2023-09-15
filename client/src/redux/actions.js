import axios from "axios"

export const  GET_DRIVERS = "GET_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TEAMS = 'GET_TEAMS'
export const TEAMS_FILTER = 'TEAMS_FILTER'
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const SORT_DRIVER = 'SORT_DRIVER';
export const ORIGINAL_ORDER = 'ORIGINAL_ORDER'
export const SORT_DOB = 'SORT_DOB'
export const CREATE_DRIVER = "CREATE_DRIVER"
export const CLEAR_DRIVER_DATA = 'CLEAR_DRIVER_DATA'

const BASE_URL = "http://localhost:3001";

export function getDrivers() {
    return async function(dispatch){
        const response = await axios(`${BASE_URL}/drivers`);
        return dispatch ({
            type: "GET_DRIVERS",
            payload: response.data
        });
    }
}


export const getNameDriver = (name) => {
    console.log("Buscando conductor con nombre:", name);
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);
        dispatch({ type: 'GET_BY_NAME', payload: response.data });
        console.log("Respuesta del servidor:", response.data);
        return response.data; // Devolver los conductores encontrados
      } catch (error) {
        console.error("Error al buscar conductor por nombre:", error);
        throw error;
      }
    };
  };
  

export const clearDriverData = () => ({
    type: 'CLEAR_DRIVER_DATA',
});
export function getDetails(id) {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/drivers/${id}`)
        return dispatch({
            type: "GET_DETAILS",
            payload: response.data
        })

    }
}

export function getTeams() {
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/teams");
            dispatch({
                type: 'GET_TEAMS',
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }
}

export function teamsFilter(filter) {
    return {
        type: TEAMS_FILTER,
        payload: filter
    }
}

export function sortDriver(filterName){
    return{
      type: SORT_DRIVER,
      payload: filterName
    }
}

export function originalOrder() {
    return{
        type: ORIGINAL_ORDER
    }
}

export function sortDob(order) {
    return{
        type: SORT_DOB,
        payload: order
    }
}
export function createDrivers(userData) {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:3001/drivers", userData);
        dispatch({
          type: CREATE_DRIVER,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error creating driver:", error);
        // Puedes manejar el error de alguna manera aquí, como mostrar un mensaje de error.
      }
    };
}

