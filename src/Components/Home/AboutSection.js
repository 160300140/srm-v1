import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../img/landscape/nat-1-large.jpg';
import img2 from '../../img/landscape/nat-2-large.jpg';
import img3 from '../../img/landscape/nat-3-large.jpg';

export default function AboutSection() {

    return (
        <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Exciting experience for business people
                </h2>
            </div>

            <div className="row">
                <div className="col-1-of-2">
                    <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love with the system</h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur
                        libero repellat quis consequatur
                        ducimus quam nisi exercitationem omnis earum qui.
                    </p>

                    <h3 className="heading-tertiary u-margin-bottom-small">Experiment with simplicity like you never have before</h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla deserunt voluptatum
                        nam.
                    </p>

                    <Link to={"#"} className="btn-text">Learn more &rarr;</Link>
                </div>
                <div className="col-1-of-2">
                    <div className="composition">
                        
                        <img srcSet={`${img1} 300w, ${img1} 1000w`}
                            sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Photo 1"
                            className="composition__photo composition__photo--p1" src={img1} />

                        <img srcSet={`${img2} 300w, ${img2} 1000w`}
                            sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Photo 2"
                            className="composition__photo composition__photo--p2" src={img2} />

                        <img srcSet={`${img3} 300w, ${img3} 1000w`}
                            sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Photo 3"
                            className="composition__photo composition__photo--p3" src={img3} />

                    </div>
                </div>
            </div>
        </section>

    )
}
