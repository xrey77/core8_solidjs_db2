import { Component,createSignal } from 'solid-js';
import axios from 'axios';
import { useNavigate } from "@solidjs/router";
import $ from 'jquery';
import Mfa from './Mfa';
import Forgot from './Forgot';

const api = axios.create({
    baseURL: "https://localhost:7101",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
});

const Login: Component = (props) => {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [message, setMessage] = createSignal('');
    const [disable, setDisable] = createSignal(false);
    const navigate = useNavigate();

    const closeLogin = () => {
        setUsername('');
        setPassword('');
        setMessage('');
        $("#loginReset").click();
        navigate("/home", { replace: true });
        window.location.reload();
    }

    const submitLogin = (event: any) => {        
        event.preventDefault();
        setDisable(true);
        setMessage('Please wait...');
        const jsondata = JSON.stringify({ username: username(), password_hash: password() });
        api.post("/signin", jsondata)
        .then((res) => {
                setMessage(res.data.message);
                if (res.data.qrcodeurl !== null) {
                    sessionStorage.setItem('USERID',res.data.id);
                    sessionStorage.setItem('TOKEN',res.data.token);
                    sessionStorage.setItem('ROLE',res.data.roles);
                    sessionStorage.setItem('USERPIC',res.data.profilepic);
                    $("#loginReset").click();
                    $("#mfaModal").click();
                    setDisable(false);
                } else {
                    sessionStorage.setItem('USERID',res.data.id);
                    sessionStorage.setItem('USERNAME',res.data.username);
                    sessionStorage.setItem('TOKEN',res.data.token);                        
                    sessionStorage.setItem('ROLE',res.data.roles);
                    sessionStorage.setItem('USERPIC',res.data.profilepic);                    
                    $("#loginReset").click();
                    $("#closeLogin").click();
                    setDisable(false);
                    setInterval(closeLogin, 1000);                    
                }
          }, (error: any) => {
                setMessage(error.response.data.message);
                window.setTimeout(() => {
                    setMessage('');
                    setDisable(false);
                }, 3000);
                return;
        });        

    }

  return (
    <>
    <div class="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticLoginLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-primary">
            <h1 class="modal-title fs-5 text-white" id="staticLoginLabel">User's Login</h1>
            <button id="closeLogin" type="button" onclick={closeLogin} class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form onsubmit={submitLogin} autocomplete='off'>
                <div class="mb-3">
                    <input type="text" required value={username()} onInput={e => setUsername(e.currentTarget.value)} class="form-control" disabled={disable()} placeholder="enter Username"/>
                </div>
                <div class="mb-3">
                    <input type="password" required value={password()} onInput={e => setPassword(e.currentTarget.value)} class="form-control" disabled={disable()} placeholder="enter Password"/>
                    <div class="w-100 emboss-forgot"><a class='forgot' href="#" data-bs-toggle="modal" data-bs-target="#staticForgot">forgot Password ?</a></div>
                </div>
                <button type="submit" disabled={disable()} class="btn btn-primary mx-2">login</button>
                <button id="loginReset" type="reset" class="btn btn-primary">reset</button>
                <button id="mfaModal" type='button' class="btn btn-warning d-none" data-bs-toggle="modal" data-bs-target="#staticMfa">MFA</button>
            </form>
        </div>
        <div class="modal-footer">
            <div class="w-100 text-center text-danger">{message()}</div>
        </div>
        </div>
    </div>
    </div>
    <Mfa/>
    <Forgot/>
    </>
  );
};

export default Login;

