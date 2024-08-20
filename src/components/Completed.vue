<template>
    <section class="vh-100 bg-guest-detail" style="background-color: #f1f1f1">
      <div class="d-flex justify-content-center align-items-center h-100">
        <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
        <div class="col-12 col-md-6 col-lg-8 col-xl-8 text-center">
          <div class="bg-white container-border-bottom align-items-center row">
            <div class="col-md-12 text-center">
              <div class="row">
                <h2 class="mb-3">Completed</h2>
                <p>"Please take you badge, thank you"</p>
               <div class="row">
                <div class="col-md-3"><img src="../assets/image/down.gif" alt="qr code" width="100%" class="img-qr" /></div>
                <div class="col-md-3"><img src="../assets/image/down.gif" alt="qr code" width="100%" class="img-qr" /></div>
                <div class="col-md-3"><img src="../assets/image/down.gif" alt="qr code" width="100%" class="img-qr" /></div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
    import Swal from "sweetalert2";
    import axios from "axios";
    import $ from "jquery";
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';
  
    export default {
      data() {
        return {
          checkin_status: false,
          global_url: this.$globalURL,
          isLoading: false,
          fullPage: true,
        };
      },
      components: {
        Loading
      },
      methods: {
        finishScan() {
          this.$router.go("/scanpage");
        },
      },
      mounted() {
        this.isLoading = true;
        // simulate AJAX
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        this.getSession();
        if (this.obj.events_id == null) {
          Swal.fire({
            title: "Your Session is Expired!",
            icon: "warning",
          });
          setTimeout(100);
          this.$router.push("/");
        } else {
          this.on_scanner();
        }
      },
    };
  </script>
  
  <style scoped>
    a {
      text-decoration: none;
    }
  
    #printable {
      border: 1px solid;
    }
  
    span {
      color: #888888;
      font-family: Arial, Helvetica, sans-serif;
    }
  
    .h4 {
      color: #fff;
    }
  
    .email {
      font-size: 10px;
      color: #fff;
    }
  
    h1 {
      margin-bottom: 0px;
      text-align: center;
      font-weight: bold;
      color: #163c56;
      font-family: helvetica;
    }
  
    .bg-scanpage {
      position: relative;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background: url(../assets/image/bg-agenda-session.png)
    }
  
    .text-none {
      border: none;
      color: #fff;
      outline-style: none;
      z-index: -99;
      font-size: 1px;
    }
  
    .btn-camera-scanner {
      background-color: #EBEBEB;
      color: #25516B;
      border-radius: 10px;
      font-size: 15px;
      align-items: center;
      text-align: center;
      border: none;
      padding: 10px;
      width: 75%;
    }
  
    #scanner:focus {
      border-color: #fff;
      color: #fff;
    }
  
    .img-qr {
      max-width: 350px;
      padding: 2rem;
      margin: auto;
    }
  
    .thankyou {
      color: #315568;
      font-size: 18pt;
    }
  
    .bg-white {
      background-color: #fff;
    }
  
    .bg-darkblue{
      color: #25516B;
    }
  
    .container-border-bottom {
      border-width: thin;
      border-radius: 20px;
      border-bottom: 10px solid;
      border-color: #5697b2;
      margin: 0 10px 0 10px;
    }
  
    .border-left {
      border-left: 10px solid;
      align-items: left;
      border-color: #163c56;
      padding: 30px;
    }
  
    .card-deck {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }
  
    .button-finish {
      width: 50%;
      background-color: #163c56;
      color: #fff;
      font-family: Helvetica;
      border-radius: 50px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 16pt;
      font-weight: bold;
    }
  
    .bg-profile {
      background-image: linear-gradient(#5697b2, #1b6476);
    }
  
    .border-bottom {
      border-bottom: 1px solid #163c56;
    }
  
    .checkin h1,
    span {
      color: #fff;
      font-family: Helvetica;
    }
  
    .text-center {
      text-align: center;
      align-items: center;
    }
  
    .align-center {
      text-align: center;
    }
  
    .checkin span {
      color: #fff;
      font-family: Helvetica;
      font-style: italic;
    }
  
    .account-details {
      position: relative;
      padding: 10px;
      border-bottom: 1px solid;
      text-align: left;
    }
  
    .account-details h4 {
      color: #143c55;
      font-weight: bold;
      text-align: left;
    }
  
    .account-details p {
      color: #1a283d;
      text-align: left;
      margin: 0 !important;
    }
  
    .form-text {
      display: block;
      width: 100%;
      padding: 0.2rem 0.2rem;
      font-size: 0.5rem;
    }
  
    .container-border-profile {
      border-width: thin;
      border-radius: 20px;
      border-bottom: 20px solid;
      border-color: #fff;
    }
  
    .container-border-details {
      border-width: thin;
      border-radius: 20px;
      border-bottom: 20px solid;
      border-color: #5697b2;
    }
  
    .card-deck {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }
  
    .img-print {
      width: 100%;
    }
  
    .printable {
      display: none;
    }
  
    @media print {
  
      .printable {
        position: absolute;
        text-align: center;
        height: 491px;
        width: 377px;
        background-color: #fff;
        clear: both;
        font-size: 12px;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        bottom: 100;
      }
    }
  
    @media print and (width: 58mm) and (height: 80mm) {
      @page {
        margin: 1cm;
      }
    }
  </style>