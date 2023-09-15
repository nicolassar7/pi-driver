import { Link } from 'react-router-dom';
import './card.css';
import React from "react";
import pngwingImage from '../../assets/pngwing.com.png'

function Card({ driver }) {
    const { id, name, image, teams } = driver;

    const renderImage = () => {
        if (image && image.url) {
            return <img src={image.url} alt="" />;
        } else {
            return <img src={pngwingImage} alt="Imagen predeterminada" />;
        }
    }

    return (
        <div className="card">
            <div>
                {renderImage()}
                <h2 className='name'>{name?.forename} {name?.surname}</h2>
                <p className='text'>{teams.join(', ')}</p>
            </div>
            <Link to={`/detail/${id}`}>
                <button>
                    <span>DETAIL</span>
                </button>
            </Link>
        </div>
    );
}

export default Card;
