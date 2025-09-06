import { createSignal, type Component, onMount } from 'solid-js';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7101",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const Mfa: Component = (props) => {
    const [otp, setOtp] = createSignal('');
    const [userid, setUserid] = createSignal('');
    const [message, setMessage] = createSignal('');
    const [disable, setDisable] = createSignal(false);

    onMount(() => {
        const usrid = sessionStorage.getItem('USERID');
        if (usrid) {
            setUserid(usrid);
        }
    })

    const closeMFA = () => {
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('USERPIC');
        setOtp('');
        setMessage('');
    }

    const submitOTP = (event: any) => {
        event.preventDefault();
        setDisable(true);
        const data =JSON.stringify({ id: userid(), otp: otp() });
        api.post("/validateotp", data)
        .then((res) => {
                setMessage(res.data.message);
                sessionStorage.setItem("USERNAME", res.data.username);
                window.setTimeout(() => {
                  setOtp('');
                  window.location.reload();
                },3000);
          }, (error: any) => {
               setMessage(error.response.data.message);
        });            
        window.setTimeout(() => {
          setDisable(false);
          setMessage('');
          setOtp('');
        }, 3000);
    }
    
  return (
    <div class="modal fade" id="staticMfa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticMfaLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-warning">
            <h3 class="modal-title" id="staticMfaLabel">Multi-Factor Auth</h3>
            <button type="button" onclick={closeMFA} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form onsubmit={submitOTP} autocomplete='off'>
                <div class="mb-3">
                    <input type="text" required value={otp()} oninput={e => setOtp(e.currentTarget.value)} class="form-control" disabled={disable()} placeholder="enter 6-digit OTP Code"/>
                </div>
                <button type='submit' disabled={disable()} class="btn btn-warning mx-2">submit</button>
                <button type='reset' class="btn btn-warning">reset</button>
            </form>
        </div>
        <div class="modal-footer">
            <div class="w-100 text-center text-danger">{message()}</div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Mfa;

