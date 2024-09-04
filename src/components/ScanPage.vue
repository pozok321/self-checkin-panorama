<template>
  <section class="vh-100 bg-scanpage" style="background-color: #f1f1f1" v-if="checkin_status == false">
    <div class="d-flex justify-content-center align-items-center h-100">
      <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
      <div class="col-12 col-md-6 col-lg-8 col-xl-8 text-center">
        <div class="bg-white container-border-bottom align-items-center row">
          <div class="col-md-5">
            <input type="text" id="scanner" class="text-none" autofocus="autofocus" />
            <img src="../assets/image/qr-code.gif" alt="qr code" width="100%" class="img-qr" />
            <div class="checkin mb-3">
              <button class="btn-camera-scanner" disabled>
                <span class="mx-3"><img src="../assets/image/ionic-ios-camera.svg" alt="checkin-icon"></span>Scan the QR
                Code</button>
            </div>
          </div>
          <div class="col-md-7 border-left">
            <img :src=" global_url + session.poster" alt="event banner" width="100%" height="100%">
          </div>
        </div>
        <div class="row mt-3">
          <h4 class="bg-darkblue">Tap Your QR to Scanner</h4>
          <p>Please wait till your QR show the details information</p>
        </div>
      </div>
    </div>
  </section>
  <section class="vh-100 bg-guest-detail" style="background-color: #f1f1f1" v-else>
    <div class="d-flex justify-content-center align-items-center h-100">
      <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
      <div class="col-12 col-md-6 col-lg-8 col-xl-8 text-center">
        <div class="bg-white container-border-bottom align-items-center row">
          <div class="col-md-6">
            <input type="text" id="scanner" class="text-none" autofocus="autofocus" />
            <img src="../assets/image/printer2.gif" alt="qr code" width="100%" class="img-qr" />
          </div>
          <div class="col-md-6 border-left">
            <div class="row">
              <h2 class="mb-3">Welcome {{ scanner_data.guest.fullname }}</h2>
              <div class="border-bottom mt-1 mb-1"></div>
              <h3 class="mt-2">"Please wait for your badges to finish printing"</h3>
            </div>
          </div>
          <div class="printable" id="areaprint" style="border: 1px solid;">
            <center>
            <img :src=" global_url + scanner_data.guest.guest_qr" width="40%" alt="guest" style="margin-top: 145px" />
            <h4 class="text-center" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px">
              {{ scanner_data.guest.fullname }}</h4>
            <p class="text-center" style="font-family: Arial, Helvetica, sans-serif; font-size: 15px">
              {{ scanner_data.guest.ticketclass_name }}</p>
            </center>
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
        session: "",
        global_url: this.$globalURL,
        obj: {
          events_id: "",
          agenda_id: "",
          track_id: "",
          session_id: "",
          guests_token: "",
          scanner_name: "A",
          scan_source: "SS",
        },
        isLoading: false,
        fullPage: true,
      };
    },
    components: {
      Loading
    },
    methods: {
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
      getAgenda() {
        axios({
          method: "GET",
          url: "/selfsvc/event/" + this.events_id + "/agenda",
          headers: {
            "Content-Type": "text/plain",
          },
        }).then((res) => {
          this.agenda = res.data;
        });
      },

      getTrack() {
        axios({
          method: "GET",
          url: "/selfsvc/event/" + this.events_id + "/agenda/" + this.agenda_id + "/track",
          headers: {
            "Content-Type": "text/plain",
          },
        }).then((res) => {
          this.track = res.data;
        });
      },

      getSession() {
        axios({
          method: "GET",
          url: "/selfsvc/event/" + this.obj.events_id + "/agenda/" + this.obj.agenda_id + "/track/" + this.obj
            .track_id + "/session/" + this.obj.session_id,
          headers: {
            "Content-Type": "text/plain",
          },
        }).then((res) => {
          this.session = res.data;
        });
      },

      on_scanner() {
        setTimeout(function () {
          $("#scanner").trigger("focus");
        }, 500);
        this.isLoading = true;
        // simulate AJAX
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        let is_event = false; // for check just one event declaration
        let input = document.getElementById("scanner");
        var this_is = this;
        input.addEventListener("focus", function () {
          if (!is_event) {
            is_event = true;
            input.addEventListener("keypress", function (e) {
              // setTimeout(function () {
              if (e.keyCode == 13) {
                // console.log("count", this_is.obj.guests_token_scan, input.value)
                if (input.value != this_is.obj.guests_token_scan) {
                  this_is.checkin_withScanner(input.value);
                }
                input.select();
              }
              // }, 500)
            });
          }
        });
        document.addEventListener("keypress", function (e) {
          if (e.target.tagName !== "INPUT") {
            input.focus();
          }
        });
      },

      checkin_withScanner(value) {
        this.obj.guests_token = value;
        axios({
          method: "POST",
          url: "/guest/scan/checkin",
          data: this.obj,
          headers: {
            "Content-Type": "text/plain",
          },
        }).then((res) => {
          this.on_scanner();
          this.scanner_data = res.data;
          this.status = res.data.status;
          this.guests_token_scan = this.scanner_data.guests_token;
          if (this.scanner_data.message === "Welcome") {
            // simulate AJAX
            setTimeout(() => {
              // this.isLoading = false
              this.checkin_status = true;
            }, 500)
          }
          switch (this.status) {
            case 200:
              this.checkin_status = true;
              this.on_print();
              finishScan();
              break;
            case 201:
              this.checkin_status = false;
              Swal.fire({
                title: this.scanner_data.message,
                icon: "info",
              });
              break;
            case 202:
              this.checkin_status = false;
              Swal.fire({
                title: this.scanner_data.message,
                icon: "info",
              });
              break;
            case 203:
              this.checkin_status = false;
              Swal.fire({
                title: this.scanner_data.message,
                icon: "warning",
              });
              break;
            default:
              this.checkin_status = false;
              Swal.fire({
                title: this.scanner_data.message,
                icon: "warning",
              });
              break;
          }
        });
      },

      finishScan() {
        this.$router.go("/scanpage");
      },

      on_print() {
        setTimeout(function () {
          var contents = document.getElementById("areaprint").innerHTML;
          var frame1 = document.createElement('iframe');
          frame1.name = "frame1";
          frame1.style.position = "absolute";
          frame1.style.top = "-1000000px";
          document.body.appendChild(frame1);
          var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1
            .contentDocument.document : frame1.contentDocument;
          frameDoc.document.open();
          frameDoc.document.write('<html><head><title>DIV Contents</title>');
          frameDoc.document.write('</head><body>');
          frameDoc.document.write(contents);
          frameDoc.document.write('</body></html>');
          frameDoc.document.close();
          setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
          }, 500);
          window.onload = function () {
            self.print();
          }
          return false;
        }, 500);
      },

    },

    mounted() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 500)
      this.obj.events_id = $cookies.get("events_id");
      this.obj.session_id = $cookies.get("session_id");
      this.obj.agenda_id = $cookies.get("agenda_id");
      this.obj.track_id = $cookies.get("track_id");
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

  .bg-darkblue {
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