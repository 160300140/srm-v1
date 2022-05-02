import React from 'react';
import { Link } from 'react-router-dom';
import PopUp from '../Home/Popup';

export default function PricingSection() {
    //#region return
    return (
        <section className="section-pricing" id="section-pricing">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Catálogo
                </h2>
            </div>

            <div className="row" style={{ padding:'40px' }}>
                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture card__picture--1">
                                &nbsp;
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--1">Plan básico</span>
                            </h4>
                            <div className="card__details">
                                <ul>
                                    <li>Módulo RH</li>
                                    <li>Módulo CRM</li>
                                    <li>Módulo Ventas</li>
                                    <li>Módulo Logística</li>
                                    <li>Módulo Compañía</li>
                                    <li>Estadística base</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card__side card__side--back card__side--back-1">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Precio</p>
                                    <p className="card__price-value">$524 al mes</p>
                                </div>
                                <Link to={"#popup"} className="btn btn--white">Comprar</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture card__picture--2">
                                &nbsp;
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--2">Plan extendido</span>
                            </h4>
                            <div className="card__details">
                                <ul>
                                    <li>Módulo RH</li>
                                    <li>Módulo CRM</li>
                                    <li>Módulo Ventas</li>
                                    <li>Módulo Logística</li>
                                    <li>Módulo Compañía</li>
                                    <li>Estadística avanzada</li>
                                </ul>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-2">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Precio</p>
                                    <p className="card__price-value">$700</p>
                                </div>
                                <Link to={PopUp} className="btn btn--white">Comprar</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture card__picture--3">
                                &nbsp;
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--3">Plan premium</span>
                            </h4>
                            <div className="card__details">
                                <ul>
                                    <li>Módulo RH</li>
                                    <li>Módulo CRM</li>
                                    <li>Módulo Ventas</li>
                                    <li>Módulo Logística</li>
                                    <li>Módulo Compañía</li>
                                    <li>Data WareHouse</li>
                                </ul>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-3">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Precio</p>
                                    <p className="card__price-value">Próximamante</p>
                                </div>
                                <Link to={"#popup"} className="btn btn--white">Comprar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="u-center-text u-margin-top-huge">
                <Link to={"#"} className="btn btn--green">Descubre nuestros productos</Link>
            </div>
        </section>
    )
    //#endregion return
}