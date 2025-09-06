// src/layouts/RootLayout.tsx
import { type ParentComponent } from 'solid-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RootLayout: ParentComponent = (props) => {
  return (
    <div>
        <Header/>
            <main>
                {props.children}
            </main>
        <Footer/>
    </div>
  );
};

export default RootLayout;
