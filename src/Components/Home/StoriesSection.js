import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../img/landscape/nat-8.jpg'
import img2 from '../../img/landscape/nat-9.jpg'

export default function StoriesSection() {

    //#region return
    return (
        <section className="section-stories" style={{ padding:'40px' }}>
            <div className="bg-video">
                <video className="bg-video__content" autoPlay muted loop>
                    <source srcname="img/video.mp4" type="video/mp4" />
                    <source srcname="img/video.webm" type="video/webm" />
                    ¡No soportado!
                </video>
            </div>

            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary" style={{color:'white'}}>
                    Comunidad
                </h2>
            </div>

            <div className="row">
                <div className="story">
                    <figure className="story__shape">
                        <img src={img1} alt="Person on a tour" className="story__img" />
                        <figcaption className="story__caption">Mary Smith</figcaption>
                    </figure>
                    <div className="story__text">
                        <h3 className="heading-tertiary u-margin-bottom-small">Software amigable</h3>
                        <p>
                        Gracias a este software, el tiempo de registro es menor y permite agilizar otras actividades para la microempresa.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="story">
                    <figure className="story__shape">
                        <img src={img2} alt="Person on a tour" className="story__img" />
                        <figcaption className="story__caption">Jack Wilson</figcaption>
                    </figure>
                    <div className="story__text">
                        <h3 className="heading-tertiary u-margin-bottom-small">Software intuitivo</h3>
                        <p>
                        Este sistema tiene una organización de los módulos intuitivo, el cual me permite agilizar y explicar a mis colaboradores las actividades a realizar.
                        </p>
                    </div>
                </div>
            </div>

            <div className="u-center-text u-margin-top-huge">
                <Link to={"#"} className="btn-text">Read all stories &rarr;</Link>
            </div>
        </section>
    )
    //#endregion return
}