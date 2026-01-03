import { Component,Show,createSignal } from 'solid-js';
import axios from 'axios';
import $ from 'jquery';

const api = axios.create({
    baseURL: "https://localhost:7101",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

const Forgot: Component = (props) => {
    const [email, setEmail] = createSignal('');
    const [message, setMessage] = createSignal('');
    const [disable, setDisable] = createSignal(false);
    const [enableMailtoken, setEnableMailtoken] = createSignal(false);
    const [mailtoken, setMailtoken] = createSignal('');
    const [username, setUsername] = createSignal('');
    const [newpassword, setNewpassword] = createSignal('');
    
    const closeForgot = () => {
        setEmail('');
        setMessage('');
        setEnableMailtoken(false);
        $("#forgotReset").click();
    }

    const activateMailtoken = (event: Event) => {
        setEnableMailtoken(true);
    }
    const submitForgot = (event: any) => {        
        event.preventDefault();
        setDisable(true);
        setMessage('Please wait...');
        const jsondata = JSON.stringify({ email: email() });
        api.post("/api/emailtoken", jsondata)
        .then((res) => {
                setMessage(res.data.message);
                window.setTimeout(() => {
                    setMessage('');
                    $("#loginReset").click();
                    $("#closeLogin").click();
                    setInterval(closeForgot, 3000);                    
                    setDisable(false);
                }, 6000);

          }, (error: any) => {
                if (error.response){
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.message);
                }
                window.setTimeout(() => {
                    setMessage('');
                    setDisable(false);
                }, 6000);        
        });        
    }

    const submitMailtoken = (event: Event) => {
        event?.preventDefault();        
        if (mailtoken() === '' || mailtoken() === '0') {
            setMessage("Plese enter Mail Token...");
            window.setTimeout(() => { setMessage(''); setMailtoken('') }, 3000);
            return;
        }
        if (username() === '') {
            setMessage("Please enter your Username...")
            window.setTimeout(() => { setMessage(''); }, 3000);
            return;
        }
        if (newpassword() === '') {
            setMessage("Please enter your new Password...");
            window.setTimeout(() => { setMessage(''); }, 3000);
            return;
        }
        setMessage("Please wait....");
        const data =JSON.stringify({ mailtoken: mailtoken(), password_hash: newpassword()});
        api.patch(`/api/resetpassword/${username()}`, data, { headers: {
        'Content-Type': 'application/json'
        }})
        .then((res) => {
            setMessage(res.data.message);
            window.setTimeout(() => {
                setMessage('');
            }, 6000);
            return;
          }, (error: any) => {
                if (error.response){
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.message);
                }
                window.setTimeout(() => {
                    setMessage('');
                }, 6000);
                return;
        });
    }

  return (
    <div class="modal fade" id="staticForgot" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticForgotLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-danger">
            <h1 class="modal-title fs-5 text-white" id="staticForgotLabel">Forgot Password</h1>
            <button id="closeLogin" type="button" onclick={closeForgot} class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form onsubmit={submitForgot} autocomplete='off'>
                <div class="mb-3">
                    <div class="w-100 emboss-forgot mb-1"><a onclick={activateMailtoken} class='forgot' href="#" >enter Mailtoken</a></div>
                    <Show when={enableMailtoken()}>
                        <input type="text" required value={mailtoken()} onInput={e => setMailtoken(e.currentTarget.value)} class="form-control" disabled={disable()} placeholder="step #2-enter 4-digit Mailtoken"/>
                        <input type="text" required value={username()} onInput={e => setUsername(e.currentTarget.value)} class="form-control mt-1" disabled={disable()} placeholder="enter your current username"/>
                        <input type="password" required value={newpassword()} onInput={e => setNewpassword(e.currentTarget.value)} class="form-control mt-1" disabled={disable()} placeholder="enter your new password"/>

                    </Show>
                    <Show when={!enableMailtoken()}>
                        <input type="email" required value={email()} onInput={e => setEmail(e.currentTarget.value)} class="form-control" disabled={disable()} placeholder="step #1-enter your Email Address"/>
                    </Show>

                </div>
                <Show when={enableMailtoken()}>
                    <button type="button" onclick={submitMailtoken} disabled={disable()} class="btn btn-danger mx-2">change password</button>
            </Show>
                <Show when={!enableMailtoken()}>
                    <button type="submit" disabled={disable()} class="btn btn-danger mx-2">submit</button>
                </Show>

                <button id="forgotReset" type="reset" class="btn btn-danger">reset</button>
            </form>
        </div>
        <div class="modal-footer">
            <div class="w-100 text-center text-danger fontsize-12">{message()}</div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Forgot;

