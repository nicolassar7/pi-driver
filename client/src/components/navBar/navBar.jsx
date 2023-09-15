import React, { useState } from "react"; 
import TeamFilter from "../filter/filter";
import SortDriver from "../sortDriver/sortDriver";
import { Link } from "react-router-dom";
import './navbar.css'

function NavBar({ handleChange, handleSubmit, setPage }) {
    const [searchString, setSearchString] = useState(""); // Define searchString y setSearchString

    return (
        <div className="nav">
            <form className="search">
                <input
                    placeholder="Búsqueda"
                    type="search"
                    className="input"
                    onChange={(e) => setSearchString(e.target.value)} // Actualiza searchString al cambiar el valor del input
                    value={searchString} // Establece el valor del input para que refleje searchString
                />
                <span className="underline"></span>
                <button type="button" onClick={() => handleSubmit(searchString)} className="button">
                    Buscar
                </button>
            </form>
            <Link to="/createDriver">
                <button className="create">CREATE</button>
            </Link>
            <TeamFilter setPage={setPage} />
            <SortDriver setPage={setPage} />
        </div>
    );
}

export default NavBar;
