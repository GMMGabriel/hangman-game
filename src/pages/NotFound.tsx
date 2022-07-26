import { Link, useLocation } from 'react-router-dom';

import brokenGallowsImg from '../assets/images/broken-gallows.svg'

import '../styles/not-found.scss';

export function NotFound() {
    const location = useLocation();

    console.log(location);

    return (
        <div id="not-found">
            <main>
                <div className="box">
                    <figure>
                        <img src={brokenGallowsImg} alt="Imagem da forca com uma de sus madeiras quebrada e caída" />
                    </figure>
                    <div>
                        <h1>404</h1>
                        <p>{`${location.pathname}${location.search}`}</p>
                    </div>
                </div>
                <Link to="/" className="button">Página inicial</Link>
            </main>
        </div>
    );
}