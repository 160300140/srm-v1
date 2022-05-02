//Layout
import LayoutAdmin from '../Layouts/LayoutAdmin';
import LayoutUser from '../Layouts/LayoutUser';

//Admin pages
import AdminHome from '../Pages/Admin';
import AdminSignIn from '../Pages/Admin/SignIn';
import AdminSignUp from '../Pages/Admin/SignUp';
import HumanRes from '../Pages/Admin/HumanRes/Employee';
import Purchase from '../Pages/Admin/Logistic/Purchase';
import Providers from '../Pages/Admin/Logistic/Providerss';
import Business from '../Pages/Admin/Company/Business';
import Sale from '../Pages/Admin/Sale/Sales';
import Quotation from '../Pages/Admin/Sale/Quotation';

//User Pages
import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import Pricing from '../Pages/Pricing';
import Solutions from '../Pages/Solutions';
import Try from '../Pages/Try';

//Other
import Error404 from '../Pages/Error404';
import Clients from '../Pages/Admin/Crm/Clients';

//#region ConstantsRoutes
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
                path: "/admin/clients",
                component: Clients,
                exact: true
            },
            {
                path: "/admin/hr",
                component: HumanRes,
                exact: true
            },
            {
                path: "/admin/quoted",
                component: Quotation,
                exact: true
            },
            {
                path: "/admin/purchase",
                component: Purchase,
                exact: true
            },
            {
                path: "/admin/sale",
                component: Sale,
                exact: true
            },
            {
                path: "/admin/providers",
                component: Providers,
                exact: true
            },
            {
                path: "/admin/company",
                component: Business,
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
//#endregion ConstantsRoutes

export default routes;