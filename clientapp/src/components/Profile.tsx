// src/components/MyComponent.tsx
import { createSignal, type Component, Show, onMount } from 'solid-js';
import axios from 'axios';
import $ from 'jquery';

const api = axios.create({
  baseURL: "https://localhost:7101",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const Profile: Component = (props) => {
  const [userid, setUserid] = createSignal('');
  const [token, setToken] = createSignal('');
  const [lastname, setLastname] = createSignal('');
  const [firstname, setFirstname] = createSignal('');
  const [email, setEmail]  = createSignal('');
  const [mobile, setMobile]  = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confpassword, setConfpassword] = createSignal('');
  const [qrcodeurl, setQrcodeurl] = createSignal('');
  const [profileMsg, setProfileMsg] = createSignal('');
  const [profilepic, setProfilepic] = createSignal('');
  const [chgPwd, setChgPwd] = createSignal(false);
  const [chkMfa, setCkMfa] = createSignal(false);
  const [showSave, setShowSave] = createSignal(false);
  const [selectedFile, setSelectedFile] = createSignal(null);

  onMount(() => {
    const usrid = sessionStorage.getItem('USERID');
    if (usrid) {
        setUserid(usrid);
    }
    const tokenid = sessionStorage.getItem("TOKEN");
    if (tokenid) {
        setToken(tokenid);
    }
    $("#cpwd").hide();
    $("#mfa1").hide();
    $("#mfa2").hide();  
    setChgPwd(false);
    setCkMfa(false);
    setProfileMsg("Please wait.....");
    api.get(`/api/getbyid/${userid()}`, { headers: {
        Authorization: `Bearer ${token()}`
    }} )
        .then((res) => {
                setProfileMsg(res.data.user.message);
                setFirstname(res.data.user.firstname);
                setLastname(res.data.user.lastname);
                setEmail(res.data.user.email);
                setMobile(res.data.user.mobile);                
                setProfilepic(res.data.user.profilepic);
                setQrcodeurl(res.data.user.qrcodeurl);
          }, (error: any) => {
              setProfileMsg(error.response.data.message);
        });    
        window.setTimeout(() => {
          setProfileMsg('');
        }, 3000);  
  });

  const submitProfile = (event: Event) => {
    event.preventDefault();
    const data =JSON.stringify({ lastname: lastname(), 
        firstname: firstname(), mobile: mobile() });

    api.patch(`/api/updateprofile/${userid()}`, data, { headers: {
    Authorization: `Bearer ${token()}`
    }})
    .then((res) => {
            setProfileMsg(res.data.message);
      }, (error: any) => {
            setProfileMsg(error.response.data.message);
    });
    window.setTimeout(() => {
      setProfileMsg('');
    }, 3000);
  }

  const changePassword = (event: Event) => {
    event.preventDefault();
    if (password() === '') {
        setProfileMsg("Please enter New Password.");
        setTimeout(() => {
          setProfileMsg('');
        }, 3000);
        return;
    }
    if (confpassword() === '') {
      setProfileMsg("Please confirm New Password.");
        setTimeout(() => {
          setProfileMsg('');
        }, 3000);
        return;
    }
    if (password() != confpassword()) {
        setProfileMsg("New Password does not matched.");
        setTimeout(() => {
          setProfileMsg('');
        }, 3000);
        return;
    }
    setProfileMsg('Please wait...');
    const data =JSON.stringify({ password_hash: password() });
    api.patch(`/api/updatepassword/${userid()}`, data, { headers: {
    Authorization: `Bearer ${token()}`
    }} )
    .then((res) => {
          setProfileMsg(res.data.message);
      }, (error: any) => {
            setProfileMsg(error.response.data.message);
    });
    window.setTimeout(() => {
      setProfileMsg('');
      setPassword('');
      setConfpassword('');
    }, 3000);
  }

  const changePicture = (event: any) => {
    event.preventDefault();     
    let fileInputRef;       
    const file = event.target.files[0];
    if (file) {
        setSelectedFile(file);
        // $("#userpic").attr('src',URL.createObjectURL(file));
    }

    if (selectedFile()) {
        let formdata = new FormData();
        formdata.append('Id', userid());
        formdata.append('Profilepic', file);

        api.post("/api/uploadpicture", formdata, { headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token()}`
        }} )
        .then((res) => {
            setProfileMsg(res.data.message);
            setProfilepic(res.data.profilepic);
            sessionStorage.setItem('USERPIC',res.data.profilepic);
            window.setTimeout(() => {
              setProfileMsg('');
              window.location.reload();

            }, 3000);    
        }, (error: any) => {
              setProfileMsg(error.response.data.message);
        });
        window.setTimeout(() => {
          setProfileMsg('');
        }, 3000);
  } 
}

  const checkboxPassword = (event: Event) => {
    event.preventDefault();
    if (chgPwd()) {
        setChgPwd(false);    
        $("#cpwd").show();
        $("#mfa1").hide();  
        $("#mfa2").hide();  
        // setCkMfa(false);
        setShowSave(false);
    } else {
        $('#chkMfa').prop('checked', false);
        setCkMfa(false);
        setChgPwd(true);    
        setPassword('');
        setConfpassword('');
        setShowSave(true);
        $("#cpwd").hide();
    }
  }

  const checkboxMFA = (event: Event) => {
    event.preventDefault();
    if (chkMfa()) {
      $('#chkPwd').prop('checked', true);
      $("#cpwd").hide();
        $("#mfa1").show();
        $("#mfa2").show();
        setCkMfa(false);
        setChgPwd(false);
        setShowSave(false);
    } else {
        $('#chkPwd').prop('checked', false);
        setChgPwd(false);    
        setCkMfa(true);
        $("#mfa1").hide();  
        $("#mfa2").hide();                  
        setShowSave(true);
    }
  }

  const enableMFA = (event: Event) => {
    event.preventDefault();
    const data =JSON.stringify({ Twofactorenabled: true });
    api.patch(`/api/enablemfa/${userid()}`, data, { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token()}`
    }} )
    .then((res) => {
        setQrcodeurl(res.data.qrcodeurl);
        setProfileMsg(res.data.message);
      }, (error: any) => {
            setProfileMsg(error.response.data.message);
    });
    window.setTimeout(() => {
      setProfileMsg('');
    }, 3000);
  }

  const disableMFA = (event: Event) => {
    event.preventDefault();
    const data =JSON.stringify({ Twofactorenabled: false });
    api.patch(`/api/enablemfa/${userid()}`, data, { headers: {
        Authorization: `Bearer ${token()}`
    }} )
    .then((res) => {
            setQrcodeurl('');
            setProfileMsg(res.data.message);
      }, (error: any) => {
            setProfileMsg(error.response.data.message);
    });
    window.setTimeout(() => {
      setProfileMsg('');
    }, 3000);
  }

  return (
    <div class="card card-width bs-info-border-subtle">
      <div class="card-header bg-info text-light">
        <strong>USER'S PROFILE NO.&nbsp; {userid()}</strong>
      </div>
      <div class="card-body">

        <form enctype="multipart/form-data" autocomplete='off'>
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <input type="text" required value={firstname()} onInput={e => setFirstname(e.currentTarget.value)} class="form-control"  autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" required value={lastname()} onInput={e => setLastname(e.currentTarget.value)}  class="form-control" autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="email" value={email()} onInput={e => setEmail(e.currentTarget.value)} class="form-control" readonly/>
                    </div>
                    <div class="mb-3">
                        <input type="text" required value={mobile()} onInput={e => setMobile(e.currentTarget.value)} class="form-control" autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                      <Show when={!showSave()}>
                        <button type="button" onclick={submitProfile} class="btn btn-info">save</button>
                      </Show>
                    </div>

                </div>
                <div class="col">
                    <img id="userpic" class="usr" src={profilepic()} alt=""/>
                    <div class="mb-3">
                        <input type="file" multiple accept="image/*" onInput={changePicture} class="form-control form-control-sm mt-3"/>
                    </div>

                </div>
                <div class="mb-3">
              </div>

            </div>

            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input id="chkPwd" onchange={checkboxPassword} type="checkbox" class="form-check-input" />
                        <label class="form-check-label" for="chgPwd">
                            Change Password
                        </label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="chkMfa" onchange={checkboxMFA} />
                        <label class="form-check-label" for="chkMfa">
                            Multi-Factor Authenticator
                        </label>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col">

                  <Show when={chgPwd()}>

                    <div class="mb-3">
                        <input type="password" value={password()} oninput={e => setPassword(e.currentTarget.value)} class="form-control pwd mt-2" placeholder="enter new Password" autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="password" value={confpassword()} oninput={e => setConfpassword(e.currentTarget.value)} class="form-control pwd" placeholder="confirm new Password" autocomplete="off"/>
                    </div>
                    <button onclick={changePassword} type="button" class="btn btn-primary">change password</button>
                  </Show>
                  <Show when={chkMfa()}>

                    <Show when={qrcodeurl()}>
                        <img class="qrcode1" src={qrcodeurl()} alt="qrcodeurl"/>
                    </Show>
                    <Show when={!qrcodeurl()}>
                        <img class="qrcode2" src="/images/qrcode.png" alt="QRCODE" />
                    </Show>
                  </Show>
                </div>

                <div class="col">
                    <Show when={chkMfa()}>
                            <p id="qrcode-cap1" class='text-danger'><strong>Requirements</strong></p>
                            <p id="qrcode-cap2">You need to install <strong>Google or Microsoft Authenticator</strong> in your Mobile Phone, once installed, click Enable Button below, and <strong>SCAN QR CODE</strong>, next time you login, another dialog window will appear, then enter the <strong>OTP CODE</strong> from your Mobile Phone in order for you to login.</p>
                            <div class="row">
                                <div class="col btn-1">
                                    <button onclick={enableMFA} type="button" class="btn btn-primary qrcode-cap3">Enable</button>
                                </div>
                                <div class="col col-3 btn-2">
                                    <button onclick={disableMFA} type="button" class="btn btn-secondary qrcode-cap3">Disable</button>
                                </div>
                            </div>
                    </Show>
                </div>
            </div>
        </form>
      </div>
      <Show when={profileMsg()}>
       <div class="card-footer">
         <div class="w-100 text-left text-danger">{profileMsg()}</div>
       </div>
      </Show>

    </div>    
  );
};

export default Profile;