// src/components/MyComponent.tsx
import { onMount, type Component, Show, createSignal } from 'solid-js';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import Register from './Register';
import { A } from '@solidjs/router';
import { useNavigate } from "@solidjs/router";

const Header: Component = (props) => {
  const [username, setUsername] = createSignal('');
  const [userpic, setUserpic] = createSignal('');
  const navigate = useNavigate();

  onMount(() => {
    const name = sessionStorage.getItem('USERNAME');
    if (name) {
      setUsername(name);
    }
    const pic = sessionStorage.getItem('USERPIC');
    if (pic) {
      setUserpic(pic);
    }
  })

  const logout = () => {
    sessionStorage.removeItem('USERID');
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('USERPIC');
    setUsername('');
    navigate("/", { replace: true });
  }

  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <A class="navbar-brand" href="/"><img class="logo" src="/images/logo.png"/></A>
        <button class="navbar-toggler" type="button"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasWithBothOptions">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <A class="nav-link emboss-menu" aria-current="page" href="/aboutus">About Us</A>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle emboss-menu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul class="dropdown-menu">
                <li><A class="dropdown-item" href="/productlist">Products List</A></li>
                <li><A class="dropdown-item" href="/productcatalog">Products Catalog</A></li>
                <li><hr class="dropdown-divider"/></li>
                <li><A class="dropdown-item" href="/productsearch">Products Search</A></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link emboss-menu" href="/contactus">Contact Us</a>
            </li>
          </ul>

        <Show when={!username()}>
          <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <a class="nav-link emboss-menu" href="#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link emboss-menu" href="#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
            </li>
          </ul>
        </Show>

          <Show when={username()}>
           <ul class="navbar-nav mr-auto">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img class="user" src={userpic()} />&nbsp;{ username()}
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a onclick={logout} class="dropdown-item" href="/#">LogOut</a>
                    </li>
                      <li>
                        <a class="dropdown-item" href="/profile">Profile</a>                
                    </li>
                      <li><hr class="dropdown-divider"/></li>
                      <li>
                        <a class="dropdown-item" href="/#">Messenger</a>
                    </li>
                    </ul>
                  </li>              
                </ul> 
          </Show>







        </div>
      </div>
    </nav>    
    <Login/>
    <Register/>

    <div class="offcanvas offcanvas-end" data-bs-scroll="true" id="offcanvasMenu" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header bg-primary">
        <h5 class="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Drawer Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">

        <ul class="nav flex-column">
          <li class="nav-item" data-bs-dismiss="offcanvas">
            <a class="nav-link emboss-menu" aria-current="page" href="/aboutus">About Us</a>
          </li>
          <li class="nav-item"><hr/></li>
          <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle emboss-menu" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul class="dropdown-menu">
                  <li data-bs-dismiss="offcanvas"><A class="dropdown-item" href="/productlist">Products List</A></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas"><A class="dropdown-item" href="/productcatalog">Products Catalog</A></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas"><A class="dropdown-item" href="/productsearch">Product Search</A></li>
                </ul>
            </li>

            <li class="nav-item"><hr/></li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <a class="nav-link emboss-menu" aria-current="page" href="/contactus">Contact Us</a>
            </li>
            <li class="nav-item"><hr/></li>

            </ul>
            <Show when={username()}>
                 <ul class="navbar-nav mr-auto">              
                   <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">                   
                        <img class="user" src={userpic()} />&nbsp;{ username()}
                    </a>
                     <ul class="dropdown-menu">
                       <li data-bs-dismiss="offcanvas">
                         <a onclick={logout} class="dropdown-item" href="/#">LogOut</a>
                       </li>
                       <li class="nav-item"><hr/></li>
                       <li data-bs-dismiss="offcanvas">
                         <A class="dropdown-item" href="/profile">Profile</A> 
                       </li>
                       <li><hr class="dropdown-divider"/></li>
                       <li data-bs-dismiss="offcanvas">
                         <a class="dropdown-item" href="/#">Messenger</a>
                       </li>
                     </ul>
                   </li>          
                   <li class="nav-item"><hr/></li>                                        
                 </ul>     
              </Show>

              <Show when={!username()}>
                  <ul class="nav flex-column">
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <a class="nav-link emboss-menu" href="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                    </li>
                    <li class="nav-item"><hr/></li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <a class="nav-link emboss-menu" href="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                    </li>            
                  </ul>
              </Show>                  
       </div>
      </div>
    </>
  );
};

export default Header;