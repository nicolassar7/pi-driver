import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getNameDriver } from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Pagination from "../../components/pagination/pagination";
import './home.css'
import NavBar from "../../components/navBar/navBar";

function Home() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const PER_PAGE = 9;
  const drivers = useSelector(state => state.drivers);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Estado actualizado de drivers:", drivers);
  }, [drivers]);

  const handlePage = (page) => {
    setPage(page);
  }

  const handleSubmit = async (searchString) => {
    setPage(0);
    setSearchString(searchString);

    try {
      await dispatch(getDrivers(searchString));
    } catch (error) {
      console.log("Ocurrió un error al buscar los corredores:", error.message);
    }
  }

  const handleChange = (event) => {
    const searchString = event.target.value;
    handleSubmit(searchString);
  }

  const paginatedDrivers = drivers.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section className="layout">
      <div className="nav">
        <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div>
        <Cards drivers={paginatedDrivers} />
      </div>
      <div className="tres">
      </div>
      <div>
        <Pagination 
          page={page} 
          perpage={PER_PAGE} 
          total={drivers.length}
          handlePage={handlePage}
        />
      </div>
    </section>
  );
}

export default Home;