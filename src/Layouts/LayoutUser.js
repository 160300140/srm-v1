import React from 'react';
//import { Route, Switch } from 'react-router-dom';
//import { Layout } from 'antd';
import '../scss/index.scss';
import { Link } from 'react-router-dom';
import HeaderHome from '../Components/Home/HeaderHome';
import AboutSection from '../Components/Home/AboutSection';
import FeaturesSection from '../Components/Home/FeaturesSection';
import PricingSection from '../Components/Home/PricingSection';
import FooterHome from '../Components/Home/FooterHome';
import StoriesSection from '../Components/Home/StoriesSection';
import '../scss/landscape/_style.scss';


export default function LayoutUser(props) {

    const { routes } = props;

    console.log(routes);

    //const { Content, Footer } = Layout;

    return (

        /*
        <Layout>
            <h2>Menu</h2>
            <Content>
                <LoadRouters routes={routes} />
            </Content>
            <Footer> SRM 2021 </Footer>
        </Layout>
        */
        <div className="home-page">
            <div className="navigation">
                <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />

                <label htmlFor="navi-toggle" className="navigation__button">
                    <span className="navigation__icon">&nbsp;</span>
                </label>

                <div className="navigation__background">&nbsp;</div>

                <nav className="navigation__nav">
                    <ul className="navigation__list">
                        <li className="navigation__item"><Link to={"#"} className="navigation__link"><span>01</span>About Us</Link></li>
                        <li className="navigation__item"><Link to={"#"} className="navigation__link"><span>02</span>Your benfits</Link></li>
                        <li className="navigation__item"><Link to={"#"} className="navigation__link"><span>03</span>Contact</Link></li>
                        <li className="navigation__item"><Link to={"#"} className="navigation__link"><span>04</span>Stories</Link></li>
                        <li className="navigation__item"><Link to={"#"} className="navigation__link"><span>05</span>Try now</Link></li>
                    </ul>
                </nav>
            </div>
            <HeaderHome />
            <main>
                <AboutSection />
                <FeaturesSection />
                <PricingSection />
                <StoriesSection />
            </main>
            <FooterHome />
        </div>

    )
}

/*
function LoadRouters({ routes }) {
    console.log(routes);

    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    )
}
*/