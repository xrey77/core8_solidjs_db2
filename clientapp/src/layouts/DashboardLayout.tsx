import { type ParentComponent } from 'solid-js';
import { A } from '@solidjs/router';

const DashboardLayout: ParentComponent = (props) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <aside style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <h2>Dashboard</h2>
        <ul>
          <li><A class="decoration-none" href="#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</A></li>
          <li><A class="decoration-none" href="#" data-bs-toggle="modal" data-bs-target="#staticRegister">Registration</A></li>
          <li><A class="decoration-none" href="/dashboard/settings">Settings</A></li>
          <li><A class="decoration-none" href="#">Shopping</A></li>
          <li><A class="decoration-none" href="#">Reports</A></li>
          <li><A class="decoration-none" href="#">Charts</A></li>
          <li><A class="decoration-none" href="#">Statistics</A></li>
          <li><A class="decoration-none" href="#">Sports</A></li>
          <li><A class="decoration-none" href="#">Outlet</A></li>
          <li><A class="decoration-none" href="#">Campus</A></li>
          <li><A class="decoration-none" href="#">Models</A></li>
          <li><A class="decoration-none" href="#">Originals</A></li>
          <li><A class="decoration-none" href="#">T-Shirts</A></li>
          <li><A class="decoration-none" href="#">Leggings</A></li>
          <li><A class="decoration-none" href="#">Men's Pants</A></li>
          <li><A class="decoration-none" href="#">Women's Pants</A></li>
          <li><A class="decoration-none" href="#">Children's Pants</A></li>
          <li><A class="decoration-none" href="#">Gazelle</A></li>
          <li><A class="decoration-none" href="#">Specials</A></li>
          <li><A class="decoration-none" href="#">Samba</A></li>
          <li><A class="decoration-none" href="#">Superstar</A></li>


        </ul>
      </aside>
      <div style={{ flex: 1 }}>
        {props.children}
      </div>
    </div>
  );
};

export default DashboardLayout;