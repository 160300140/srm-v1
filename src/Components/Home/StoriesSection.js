import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../img/landscape/nat-8.jpg'
import img2 from '../../img/landscape/nat-9.jpg'

export default function StoriesSection() {

    return (
        <section class="section-stories">
            <div class="bg-video">
                <video class="bg-video__content" autoplay muted loop>
                    <source src="img/video.mp4" type="video/mp4" />
                    <source src="img/video.webm" type="video/webm" />
                    Your browser is not supported!
                </video>
            </div>

            <div class="u-center-text u-margin-bottom-big">
                <h2 class="heading-secondary">
                    We make people genuinely happy
                </h2>
            </div>

            <div class="row">
                <div class="story">
                    <figure class="story__shape">
                        <img src={img1} alt="Person on a tour" class="story__img" />
                        <figcaption class="story__caption">Mary Smith</figcaption>
                    </figure>
                    <div class="story__text">
                        <h3 class="heading-tertiary u-margin-bottom-small">I had the best experience ever</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur
                            libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui.
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="story">
                    <figure class="story__shape">
                        <img src={img2} alt="Person on a tour" class="story__img" />
                        <figcaption class="story__caption">Jack Wilson</figcaption>
                    </figure>
                    <div class="story__text">
                        <h3 class="heading-tertiary u-margin-bottom-small">WOW! My business is a different experience</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur
                            libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui.
                        </p>
                    </div>
                </div>
            </div>

            <div class="u-center-text u-margin-top-huge">
                <Link to={"#"} class="btn-text">Read all stories &rarr;</Link>
            </div>
        </section>
    )
}