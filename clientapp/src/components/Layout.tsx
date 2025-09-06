import { Component, JSXElement } from 'solid-js';

interface LayoutProps {
  children: JSXElement; // Represents the content to be rendered within the layout
  headerText?: string; // Optional prop for a header
  footerText?: string; // Optional prop for a footer
}

const Layout: Component<LayoutProps> = (props) => {
  return (
    <div>
      <header>
        <h1>{props.headerText || 'Default Header'}</h1>
      </header>
      <main>
        {props.children} {/* Renders the content passed to the layout */}
      </main>
      <footer>
        <p>{props.footerText || 'Default Footer'}</p>
      </footer>
    </div>
  );
};

export default Layout;