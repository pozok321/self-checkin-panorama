<template>
  <section class="vh-100">
    <div class="d-flex text-center h-100 bg-login">
      <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
      <div class="col-12 col-md-6 col-lg-6 col-xl-4">
        <div class="card">
          <div class="justify-content-center d-flex">
            <img src="../assets/image/logo-undangin-blue.svg" alt="logo undangin" class="logo-undangin" />
            <img src="../assets/image/line1.svg" alt="line 1" width="2" class="spacing-line" />
            <p class="login">Log in</p>
          </div>
          <p class="text-center mb-5">Welcome to Check In Self Service</p>
          <div class="otp-input-wrapper">
            <input type="text" maxlength="6" pattern="[0-9]*" autocomplete="off" autofocus="autofocus" id="input_otp"
              v-model="obj.events_key" v-on:keyup="login_page()">
            <svg viewBox="0 0 240 1" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="0" x2="240" y2="0" stroke="#3e3e3e" stroke-width="2" stroke-dasharray="20,22" />
            </svg>
          </div>
        </div>
        <div class="copyright text-center mt-4">
          <p>Powered by Undangin | 2024</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Swal from "sweetalert2";
  import axios from "axios";
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css';
  export default {
    data() {
      return {
        isLoading: false,
        fullPage: true,
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
        obj: {
          events_id: "",
        },
      };
    },
    components: {
      Loading
    },
    mounted() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    methods: {
      toggle_full_screen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document
            .webkitIsFullScreen)) {
          if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            /* Firefox */
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullScreen) {
            /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
          } else if (document.msRequestFullscreen) {
            /* IE/Edge */
            document.documentElement.msRequestFullscreen();
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            /* Chrome, Safari and Opera */
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
          }
        }
      },

      createCookie(name, value, day) {
        if (day) {
          let currentDate = new Date();
          currentDate.setTime(currentDate.getTime() + day * 24 * 60 * 60 * 1000);
          var expires = "expires=" + currentDate.toGMTString();
        } else {
          var expires = "";
        }
        document.cookie = name + "=" + value + ";" + expires + "; path=/";
      },

      getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },

      login_page() {
        if (this.obj.events_key.length == 6) {
          this.isLoading = true;
          axios({
            method: "post",
            url: "/selfsvc/login",
            data: this.obj,
            headers: {
              "Content-Type": "text/plain",
            },
          }).then((res) => {
            if (res.data != false) {
              Swal.fire({
                title: "Login Success!",
                text: res.data.msg,
                icon: "success",
              });
              this.createCookie("token", res.data.token);
              this.createCookie("events_id", res.data.events_id);
              var is = this
              setTimeout(() => {
                is.$router.push("/agendapage");
                // this.isLoading = false
              }, 500)
              this.toggle_full_screen();
            } else if (res.data == "") {
            setTimeout(() => {
                this.isLoading = false
              }, 500)
              Swal.fire({
                title: "Incorrect Event Key / Event ID",
                text: res.data.msg,
                icon: "warning",
              });
            }
          });
        }
      },
    },
  };
</script>

<style scoped>
  * {
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0px;
  }

  .bg-login {
    background-image: url(../assets/image/bg-login.svg);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .login {
    font-size: 3rem;
    color: #163c56;
    margin-bottom: 0px;
    font-weight: bold;
  }

  .otp-input-wrapper {
    width: 240px;
    text-align: center;
    display: inline-block;
    margin: auto;
  }

  .otp-input-wrapper input {
    padding: 0;
    width: 264px;
    font-size: 22px;
    font-weight: 600;
    color: #3e3e3e;
    background-color: transparent;
    border: 0;
    margin-left: 2px;
    letter-spacing: 30px;
    font-family: sans-serif !important;
  }

  .text-center {
    align-items: center;
    justify-content: center;
  }

  .otp-input-wrapper input:focus {
    box-shadow: none;
    outline: none;
  }

  .otp-input-wrapper svg {
    position: relative;
    display: block;
    width: 240px;
    height: 2px;
  }

  .event-id,
  .event-key {
    color: #807b7b;
  }

  .otp-field {
    flex-direction: row;
    column-gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .otp-field input {
    height: 45px;
    width: 42px;
    border-radius: 6px;
    outline: none;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid #ddd;
  }

  .otp-field input:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  .otp-field input::-webkit-inner-spin-button,
  .otp-field input::-webkit-outer-spin-button {
    display: none;
  }

  .resend {
    font-size: 12px;
  }

  .footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: black;
    font-size: 12px;
    text-align: right;
    font-family: monospace;
  }

  .footer a {
    color: black;
    text-decoration: none;
  }

  .logo-undangin {
    width: 200px;
  }

  .card {
    border: none !important;
    background-color: #f1f1f1;
  }

  .form__input {
    background-color: #f1f1f1;
    width: 100%;
    border: 0px solid transparent;
    border-radius: 0;
    border-bottom: 1px solid #000;
    padding: 1em 0.5em 0.5em;
    padding-left: 2em;
    outline: none;
    margin: 1.5em auto;
    transition: all 0.5s ease;
    font-family: Helvetica;
  }

  .login-page {
    width: 100%;
    height: 100vh;
    display: inline-block;
    display: flex;
    align-items: center;
  }

  .copyright p {
    color: #2e5d76;
    font-size: 8pt;
  }

  .bg-darkblue {
    background-color: #1a283d;
  }

  .spacing-line {
    margin-left: 10px;
    margin-right: 10px;
  }

  .rounded-top-left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .rounded-bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .width-50 {
    margin: auto;
    width: 50%;
  }

  .button-login {
    width: 100%;
    background-color: #163c56;
    color: #fff;
    font-family: Helvetica;
    border-radius: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16pt;
    font-weight: bold;
  }
</style>