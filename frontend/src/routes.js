import { HomePage } from './pages/HomePage.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { LoginPage } from './pages/LoginPage.jsx';
import { UserDetails } from './pages/UserDetails.jsx';

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/user/:userId',
        component: UserDetails,
    },
]

export default routes;