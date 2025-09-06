import { type ParentComponent } from 'solid-js';
import { A } from '@solidjs/router';

const DashboardLayout: ParentComponent = (props) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <aside style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <h2>Dashboard Nav</h2>
        <ul>
          <li><A href="/dashboard">Dashboard Home</A></li>
          {/* <li><A href="/dashboard/profile">Profile</A></li> */}
          <li><A href="/dashboard/settings">Settings</A></li>
        </ul>
      </aside>
      <div style={{ flex: 1 }}>
        {props.children}
      </div>
    </div>
  );
};

export default DashboardLayout;