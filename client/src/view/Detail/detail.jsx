import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails } from "../../redux/actions";
import { useParams } from "react-router-dom";
import './detail.css'; // Importa tu archivo CSS aquí

function Detail() {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    if (!details || !details.name) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="detail-container">
            <div className="detail">
            <h1>{details.name.forename} {details.name.surname}</h1>
            <div className="content">
                <div className="image-container">
                    <img src={details.image} alt='' />
                </div>
                <div className="info">
                    <p>Description: {details.description}</p>
                    <p>Nationality: {details.nationality}</p>
                    <p>Teams: {details.teams.join(', ')}</p>
                </div>
            </div>
            <div className="button-container">
                <Link to="/home">
                    <button>BACK</button>
                </Link>
            </div>
        </div>
        </div>
    );
}

export default Detail;
