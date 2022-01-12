import React from 'react';
import { Link } from 'react-router-dom';

export default function PopUp() {
    return (
        <div className="popup" id="popup">
            <div className="popup__content">
                <div className="popup__left">
                    <image src="img/nat-8.jpg" alt="Tour photo" className="popup__img" />
                    <image src="img/nat-9.jpg" alt="Tour photo" className="popup__img" />
                </div>
                <div className="popup__right">
                    <a href="#section-tours" className="popup__close">&times;</a>
                    <h2 className="heading-secondary u-margin-bottom-small">Start booking now</h2>
                    <h3 className="heading-tertiary u-margin-bottom-small">Important &ndash; Please read these terms before
                        booking</h3>

                    <Link href={"#"} className="btn btn--green">Book now</Link>
                </div>
            </div>
        </div>
    )
}