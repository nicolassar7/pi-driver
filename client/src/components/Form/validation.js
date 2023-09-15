const isValidURL = (url) => {
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
  return urlPattern.test(url);
};

const Validation = (event, setErrors) => {
  if (event.name === "forename") {
    // Validar el campo de nombre
  }

  if (event.name === "surname") {
    // Validar el campo de apellido
  }

  if (event.name === "nationality") {
    // Validar el campo de nacionalidad
  }

  if (event.name === "image") {
    // Validar el campo de imagen (URL)
    if (!isValidURL(event.value)) {
      setErrors((prevValue) => {
        return { ...prevValue, image: "Debe ser una dirección URL válida" };
      });
    } else {
      setErrors((prevValue) => {
        return { ...prevValue, image: "" };
      });
    }
  }

  if (event.name === "dob") {
    // Validar el campo de fecha de nacimiento
  }

  if (event.name === "description") {
    // Validar el campo de descripción
  }
};

export default Validation;
