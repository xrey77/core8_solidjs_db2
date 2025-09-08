import { Route as Routes, Route } from '@solidjs/router';
import DashboardLayout from './layouts/DashboardLayout';
import Aboutus from './components/Aboutus';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import Settings from './pages/Settings';
import Contactus from './pages/Contactus';
import List from './components/List';
import Catalogs from './components/Catalogs';
import Search from './components/Search';

const AppRoutes = () => (
  <Routes>
    <Route path="/" component={DashboardLayout} />
    <Route path="/home" component={Home} />
      <Route path="/aboutus" component={Aboutus} />
      <Route path="/contactus" component={Contactus} />
      <Route path="/productlist" component={List} />
      <Route path="/productcatalog" component={Catalogs} />
      <Route path="/productsearch" component={Search} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={DashboardLayout}>
      <Route path="/" component={Dashboard} />
      <Route path="/settings" component={Settings} />
    </Route>
  </Routes>
);

export default AppRoutes;
