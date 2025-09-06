import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import RootLayout from './layouts/RootLayout';
import AppRoutes from './AppRoutes';
import './index.css'

render(
  () => (
    <Router root={RootLayout}>
      <AppRoutes />
    </Router>
  ),
  document.getElementById('root')!
);
