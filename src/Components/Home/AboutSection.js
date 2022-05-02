import React from 'react';
import { NavLink } from 'react-router-dom';
import img1 from '../../img/landscape/nat-1-large.jpg';
import img2 from '../../img/landscape/nat-2-large.jpg';
import img3 from '../../img/landscape/nat-3-large.jpg';

export default function AboutSection() {

    //#region return
    return (
        <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Bienvenido a SOEM
                </h2>
            </div>

            <div className="row" style={{ padding:'40px' }}>
                <div className="col-1-of-2">
                <h3 className="heading-tertiary u-margin-bottom-small">En SOEM tus intereses son los nuestros</h3>
                    <p className="paragraph">
                    El uso del sistema SOEM reduce por lo menos al 50% el tiempo y la dificultad de registrar y realizar las operaciones esenciales para tu microempresa.
                    </p>
                    

                    
                    <p className="paragraph">
                    Si estás buscando el medio que te ayude a organizar la información clave para tu microempresa, de forma sencilla rápida y eficiente.
                    </p>
                    <h4 className="heading-tertiary u-margin-bottom-small">¡Ya no busques más, SOEM es para ti!</h4>

                    <NavLink to={"#"} className="btn-text">Leer más &rarr;</NavLink>
                </div>
                <div className="col-1-of-2">
                    <div className="composition">

                        <img srcSet={`${img1} 300w, ${img1} 1000w`}
                            sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Experience 1"
                            className="composition__photo composition__photo--p1" src={img1} />

                        <img srcSet={`${img2} 300w, ${img2} 1000w`}
                            sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Experience  2"
                            className="composition__photo composition__photo--p2" src={img2} />

                        <img srcSet={`${img3} 300w, ${img3} 1000w`}
                            sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Experience  3"
                            className="composition__photo composition__photo--p3" src={img3} />

                    </div>
                </div>
            </div>
        </section>
    )
    //#endregion return
}
