<template>
  <section class="vh-100">
    <div class="d-flex text-center h-100">
      <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
      <div class="col-12 col-md-6 col-lg-6 col-xl-4">
        <div class="justify-content-center d-flex">
          <img src="../assets/image/hourglass.gif" alt="logo undangin" class="logo-undangin" />
        </div>
        <p class="text-center mb-2">Please Wait</p>
        <div class="copyright text-center">
          <p>Please wait, you will be directed immediately.</p>
        </div>
      </div>
      <!-- <div class="content-bottom">
        <img src="../assets/image/content-bottom.svg" alt="wave-bottom-content" />
      </div> -->
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
        waitingPage: {
          events_id: "",
          ip_address: "10.10.10.10",
          prev_action: "p1home"
        },
        event_detail: JSON.parse(localStorage.getItem("event_details")),
      };
    },
    components: {
      Loading
    },

    methods: {
     
    },
    mounted() {
      if(this.getWaiting == "false") {
        Swal.fire({
                title: "Login Success!",
                text: res.data.msg,
                icon: "success",
              });
      }
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 500)
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

  .content-bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
  }

  .content-bottom img {
    width: 100%;
    background-size: cover;
    background-position: center;
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
    font-size: 10pt;
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