import { Link } from "react-router-dom";
import './landing.css'
import pngwingImage from'../../assets/pngwing.com.png'

function Landing () {
    return(
        <div className="landing">

                <img src={pngwingImage} alt="Descripción de la imagen" />

            <Link to='/home'>
                <button>
                    <span>JOIN</span>
                </button>
            </Link>
        </div>
    )
}

export default Landing;