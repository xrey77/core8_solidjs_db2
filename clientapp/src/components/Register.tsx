import { createSignal, type Component } from 'solid-js';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7101",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const Register: Component = (props) => {
    const [firstname, setFirstname] = createSignal('');
    const [lastname, setLastname] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [mobile, setMobile] = createSignal('');
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [message, setMessage] = createSignal('');

    const closeRegistration = () => {
      setLastname('');
      setFirstname('');
      setEmail('');
      setMobile('');
      setUsername('');
      setPassword('');
      setMessage('');
      $("#registerReset").click();
    }

    const submitRegistration = (event: any) => {
      event.preventDefault();
      setMessage("Please wait....");
        const jsondata =JSON.stringify({ lastname: lastname(), firstname: firstname(),email: email(), mobile: mobile(),username: username(), password_hash: password() });
        api.post("/signup", jsondata)
        .then((res) => {
              setMessage(res.data.message);
              window.setTimeout(() => {
                setMessage('');
              }, 3000);
              return;
          }, (error: any) => {
                setMessage(error.response.data.message);
                window.setTimeout(() => {
                setMessage('');
              }, 3000);
        });
    }

  return (
    <div class="modal fade" id="staticRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticRegisterLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-info">
            <h1 class="modal-title fs-5" id="staticRegisterLabel">Account Registration</h1>
            <button type="button" onclick={closeRegistration} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form onsubmit={submitRegistration} autocomplete='off'>
            <div class="row">
                <div class="col">
                   <div class="mb-3">
                    <input type="text" required value={firstname()} onInput={e => setFirstname(e.currentTarget.value)} class="form-control" placeholder="enter Firstname"/>
                   </div>
                </div>
                <div class="col">
                   <div class="mb-3">
                    <input type="text" required value={lastname()} oninput={e => setLastname(e.currentTarget.value)} class="form-control" placeholder="enter Lastname"/>
                   </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                   <div class="mb-3">
                    <input type="email" required value={email()} onInput={e => setEmail(e.currentTarget.value)} class="form-control" placeholder="enter Email Address"/>
                   </div>
                </div>
                <div class="col">
                   <div class="mb-3">
                    <input type="text" required value={mobile()} onInput={e => setMobile(e.currentTarget.value)} class="form-control" placeholder="enter Mobile No."/>
                   </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                   <div class="mb-3">
                    <input type="text" required value={username()} oninput={e => setUsername(e.currentTarget.value)} class="form-control" placeholder="enter Username"/>
                   </div>
                </div>
                <div class="col">
                   <div class="mb-3">
                    <input type="password" required value={password()} onInput={e => setPassword(e.currentTarget.value)} class="form-control" placeholder="enter Password"/>
                   </div>
                </div>
            </div>
            <button type="submit" class="btn btn-info mx-2">register</button>
            <button id="registerReset" type="reset" class="btn btn-info">reset</button>

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

export default Register;

