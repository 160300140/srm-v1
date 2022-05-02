import React from 'react';

export default function FeaturesSection() {

    //#region return
    return (
        <section className="section-features">
            <div className="row" style={{ padding:'40px' }}>
                <h2 className="heading-secondary" style={{color:'white',alignItems: 'center'}}>
                    SOEM ofrece los siguientes módulos para tu microempresa:
                </h2>
            </div>
            <div className="row" style={{ padding:'40px' }}>
                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-world"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">CRM</h3>
                        <p className="feature-box__text">
                        A través de este módulo llevaras la gestión y el registro de los clientes de tu microempresa.
                        </p>
                    </div>
                </div>

                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-compass"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Ventas</h3>
                        <p className="feature-box__text">
                        Tendrás acceso a servicios de ventas y cotizaciones en donde podrás monitorear y registrar quien, cuando y cuanto vendiste y ofrecer cotizaciones a tus clientes.
                        </p>
                    </div>
                </div>

                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-map"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Logística</h3>
                        <p className="feature-box__text">
                        Mejora y registra el rendimiento de tus compras, de igual manera, si deseas llevar un registro de los proveedores de tu microempresa, podrás usar el módulo de proveedores.
                        </p>
                    </div>
                </div>

                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-heart"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">RH</h3>
                        <p className="feature-box__text">
                        El módulo de recursos humanos, te ofrece un espacio para registrar y gestionar de forma fácil los empleados de tu microempresa.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row" style={{ padding:'40px' }}>
            <div className="col-1-of-5">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-heart"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Compañía</h3>
                        <p className="feature-box__text">
                        Si posees más de una sucursal, a través de este módulo podrás registrar y organizar la información de todas las sucursales de tu microempresa.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
    //#endregion return
}