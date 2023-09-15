import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDrivers, getTeams } from "../../redux/actions";
import Validation from "../../components/Form/validation.js";
import "./CreateDriver.css";

function CreateDriver() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    team: [],
    description: "",
  });
  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
  });

  const handleChange = (e) => {
    Validation(e, setErrors);
    if (e.target.name === "team") {
      if (!userData.team.includes(e.target.value)) {
        setUserData({ ...userData, team: [...userData.team, e.target.value] });
      } else {
        setUserData({
          ...userData,
          team: userData.team.filter((t) => t !== e.target.value),
        });
      }
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (
      errors.forename.length ||
      errors.surname.length ||
      errors.nationality.length ||
      errors.image.length ||
      errors.dob.length ||
      errors.description.length
    ) {
      hasErrors = true;
    }

    if (hasErrors) {
      window.alert("Falta información o hay errores en el formulario");
    } else {
      dispatch(createDrivers(userData));
      navigate("/home");
    }
  };

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input name="forename" onChange={handleChange} />
        {errors.forename && <p>{errors.forename}</p>}
        <br />

        <label>Apellido:</label>
        <input name="surname" onChange={handleChange} />
        {errors.surname && <p>{errors.surname}</p>}
        <br />

        <label>Nacionalidad:</label>
        <input name="nationality" onChange={handleChange} />
        {errors.nationality && <p>{errors.nationality}</p>}
        <br />

        <label>Imagen:</label>
        <input name="image" onChange={handleChange} />
        {errors.image && <p>{errors.image}</p>}
        <br />

        <label>Fecha de nacimiento:</label>
        <input type="date" name="dob" onChange={handleChange} />
        {errors.dob && <p>{errors.dob}</p>}
        <br />

        <label>Descripcion:</label>
        <textarea name="description" onChange={handleChange}></textarea>
        {errors.description && <p>{errors.description}</p>}
        <br />

        <label>Escuderías:</label>
        <select multiple name="team" onChange={handleChange}>
          <option disabled={true} value="">
            --Elige una opción--
          </option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
        <br />

        <p> Temas seleccionados: {userData.team}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateDriver;