//Layout
import LayoutAdmin from '../Layouts/LayoutAdmin';
import LayoutUser from '../Layouts/LayoutUser';

//Admin pages
import AdminHome from '../Pages/Admin';
import AdminSignIn from '../Pages/Admin/SignIn';
import AdminSignUp from '../Pages/Admin/SignUp';
import HR from '../Pages/Admin/HR'
import Purchase from '../Pages/Admin/Purchase';
import Sale from '../Pages/Admin/Sale';
import Stock from '../Pages/Admin/Stock';

//User Pages
import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import Pricing from '../Pages/Pricing';
import Solutions from '../Pages/Solutions';
import Try from '../Pages/Try';

//Other
import Error404 from '../Pages/Error404';



const routes = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/signup",
                component: AdminSignUp,
                exact: true
            },
            {
                path: "/admin/HR",
                component: HR,
                exact: true
            },
            {
                path: "/admin/Purchase",
                component: Purchase,
                exact: true
            },
            {
                path: "/admin/Sale",
                component: Sale,
                exact: true
            },
            {
                path: "/admin/Stock",
                component: Stock,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    },
    {
        path: '/',
        component: LayoutUser,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path: "/pricing",
                component: Pricing,
                exact: true
            },
            {
                path: "/solutions",
                component: Solutions,
                exact: true
            },
            {
                path: "/try",
                component: Try,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    }
];

export default routes;