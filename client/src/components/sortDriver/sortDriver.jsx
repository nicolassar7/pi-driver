import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { originalOrder, sortDob, sortDriver } from "../../redux/actions";
import './sortDriver.css'

function SortDriver({ setPage }) {
  const sortBy = useSelector((state) => state.drivers);
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(sortDriver(e.target.name));
  };

  const handleOrder = () => {
    dispatch(originalOrder());
  };

  const handleSortByDobAsc = () => {
    dispatch(sortDob("asc")); // Usar "asc" para ordenar ascendentemente
  };

  const handleSortByDobDesc = () => {
    dispatch(sortDob("desc")); // Usar "desc" para ordenar descendentemente
  };

  return (
    <div className="sort">
      <div className="az">
        <p>A-Z</p>
        {sortBy.length > 1 && (
          <button name="aToZ" onClick={handleSort} className="button">
            &#10607; A-Z
          </button>
        )}
        {sortBy.length > 1 && (
          <button name="zToA" onClick={handleSort} className="button">
            &#10607; Z-A
          </button>
        )}
        <p>DATE OF BIRTH</p>
        <button name="asc" onClick={handleSortByDobAsc}>
        &#10607; D.O.B
        </button>
        <button name="desc" onClick={handleSortByDobDesc}>
        &#10607; D.O.B
        </button>
      </div>
      <button className="order" onClick={handleOrder}>ORDER</button>
    </div>
  );
}

export default SortDriver;
