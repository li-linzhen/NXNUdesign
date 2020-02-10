import Home from '../../login/LoginPageNew';
import NotFound from '../../lib/NotFound/index.js';
import Authority from '../../lib/NotFound/Authority';

const routes = [
  {
    path: '/index.html',
    component: Home
  },
  {
    path: '/ZYC.html',
    component: Home
  },
  require('../routes'),
  { path: '*', component: NotFound }
];

let originRoutes = {
  path:'/',
  component:Authority,
  indexRoute: { component: Home },
  childRoutes:routes
}
export default originRoutes;

