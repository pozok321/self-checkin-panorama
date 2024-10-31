<script>
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  data() {
    return {
      checkin_status: false,
      session: "",
      poster: localStorage.getItem("poster"),
      global_url: this.$globalURL,
      get_agenda: "",
      get_track: "",
      get_session: "",
      obj: {
        events_id: $cookies.get("events_id"),
        agenda_id: $cookies.get("agenda_id"),
        track_id: $cookies.get("track_id"),
        session_id: $cookies.get("session_id"),
        guests_token: $cookies.get("token"),
        scanner_name: localStorage.getItem("scanner_name"),
        scan_source: "SS",
      },
      scanner_data: "",
      isLoading: false,
      fullPage: true,
      printarea: false,
    };
  },
  components: {
    Loading,
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
    // getAgenda() {
    //   axios({
    //     method: "GET",
    //     url: "/selfsvc/event/" + this.events_id + "/agenda",
    //     headers: {
    //       "Content-Type": "text/plain",
    //     },
    //   }).then((res) => {
    //     this.agenda = res.data;
    //   });
    // },

    // getTrack() {
    //   axios({
    //     method: "GET",
    //     url: "/selfsvc/event/" + this.events_id + "/agenda/" + this.agenda_id + "/track",
    //     headers: {
    //       "Content-Type": "text/plain",
    //     },
    //   }).then((res) => {
    //     this.track = res.data;
    //   });
    // },

    // getSession() {
    //   axios({
    //     method: "GET",
    //     url: "/selfsvc/event/" + this.obj.events_id + "/agenda/" + this.obj.agenda_id + "/track/" + this.obj.track_id + "/session/" + this.obj.session_id,
    //     headers: {
    //       "Content-Type": "text/plain",
    //     },
    //   }).then((res) => {
    //     this.session = res.data;
    //   });
    // },

    getAgenda() {
      axios({
        method: "POST",
        url: "/selfsvc/getagenda",
        headers: {
          "Content-Type": "text/plain",
          "x-api-key": this.token,
        },
        data: this.get_agenda,
      }).then((res) => {
        this.get_agenda = res.data;
      });
    },

    getTrack() {
      this.form_track.agenda_id = this.agenda_id;
      axios({
        method: "POST",
        url: "/selfsvc/gettrack",
        headers: {
          "Content-Type": "text/plain",
          "x-api-key": this.token,
        },
        data: this.get_track,
      }).then((res) => {
        this.get_track = res.data;
      });
    },

    getSession() {
      this.form_session.agenda_id = this.agenda_id;
      this.form_session.track_id = this.track_id;
      axios({
        method: "POST",
        url: "/selfsvc/getsession",
        headers: {
          "Content-Type": "text/plain",
          "x-api-key": this.token,
        },
        data: this.get_session,
      }).then((res) => {
        this.get_session = res.data;
      });
    },
    select_details(guests_token) {
      $("#qrcode").empty();
      this.printarea = true;
      var is = this;
      setTimeout(function () {
        const qrcode = new QRCode(document.getElementById("qrcode"), {
          text: guests_token,
          width: 80,
          height: 80,
          colorDark: "#000",
          colorLight: "#fff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }, 200);
    },

    on_scanner() {
      this.obj.guests_token = "";
      setTimeout(function () {
        $("#scanner").trigger("focus");
      }, 500);
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
      let is_event = false; // for check just one event declaration
      let input = document.getElementById("scanner");
      var this_is = this;
      input.addEventListener("focus", function () {
        if (!is_event) {
          is_event = true;
          input.addEventListener("keypress", function (e) {
            // setTimeout(function () {
            if (e.keyCode == 13) {
              if (input.value != this_is.obj.guests_token) {
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
        this.select_details(this.obj.guests_token);
        this.on_scanner();
        this.scanner_data = res.data;
        console.log(this.scanner_data, "scanner data");
        this.status = this.scanner_data.status;
        var is = this;
        switch (is.status) {
          case "200":
            is.checkin_status = true;
            Swal.fire({
              title: is.scanner_data.message,
              icon: "success",
            });
            is.on_print();
            setTimeout(function () {
              is.isLoading = false;
              is.finishScan();
            }, 25000);
            break;
          case "201":
            is.checkin_status = false;
            Swal.fire(
              {
                title: is.scanner_data.message,
                icon: "info",
              },
              8000
            );
            break;
          case "202":
            is.checkin_status = false;
            Swal.fire(
              {
                title: is.scanner_data.message,
                icon: "info",
              },
              8000
            );
            break;
          case "203":
            is.checkin_status = false;
            Swal.fire(
              {
                title: is.scanner_data.message,
                icon: "warning",
              },
              8000
            );
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
        var frame1 = document.createElement("iframe");
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write("<html><head><title>DIV Contents</title>");
        frameDoc.document.write("</head><body>");
        frameDoc.document.write(contents);
        frameDoc.document.write("</body></html>");
        frameDoc.document.close();
        setTimeout(function () {
          window.frames["frame1"].focus();
          window.frames["frame1"].print();
          document.body.removeChild(frame1);
        }, 500);
        window.onload = function () {
          self.print();
        };
        return false;
      }, 500);
    },

    toCheckin() {
      this.$router.go("/scanpage");
    },

    backToEventDetail() {
      this.$router.push("/eventdetailpage");
    },

    backToScan() {
      this.$router.push("/scanpage");
    },
  },

  mounted() {
    this.isLoading = true;
    this.checkin_withScanner();
    // simulate AJAX
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    this.obj.events_id = $cookies.get("events_id");
    this.obj.session_id = $cookies.get("session_id");
    this.obj.agenda_id = $cookies.get("agenda_id");
    this.obj.track_id = $cookies.get("track_id");
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

<template>
  <section class="vh-100 bg-scanpage" style="background-color: #f1f1f1" v-if="checkin_status == false">
    <div class="d-flex justify-content-center align-items-center h-100">
      <loading v-model:active="isLoading" :can-cancel="false" />
      <div class="col-12 col-md-6 col-lg-8 col-xl-8 text-center">
        <div class="button-back" @click="backToEventDetail()">
          <img src="../assets/image/left-arrow.svg" alt="back" width="50" />
        </div>
        <div class="bg-white container-border-bottom align-items-center row">
          <div class="col-md-5">
            <input type="text" id="scanner" class="text-none" autofocus="autofocus" />
            <img src="../assets/image/qr-code.gif" alt="qr code" width="100%" class="img-qr" />
            <div class="checkin mb-3">
              <button class="btn-camera-scanner" disabled>
                <span class="mx-3"><img src="../assets/image/ionic-ios-camera.svg" alt="checkin-icon" /></span>Scan the QR Code
              </button>
            </div>
          </div>
          <div class="col-md-7 border-left">
            <img :src="global_url + session.poster" alt="event banner" width="100%" height="100%" />
          </div>
        </div>
        <div class="row mt-3">
          <h4 class="bg-darkblue">Tap Your QR to Scanner</h4>
          <p>Please wait till your QR show the details information</p>
        </div>
      </div>
    </div>
  </section>
  <section class="vh-100 bg-scanpage" style="background-color: #f1f1f1" v-if="checkin_status == false && this.poster == ''">
    <div class="d-flex justify-content-center align-items-center h-100">
      <loading v-model:active="isLoading" :can-cancel="false" />
      <div class="col-12 col-md-6 col-lg-8 col-xl-8 text-center">
        <div class="button-back" @click="backToEventDetail()">
          <img src="../assets/image/left-arrow.svg" alt="back" width="50" />
        </div>
        <div class="bg-white container-border-bottom align-items-center row">
          <div class="col-md-5">
            <input type="text" id="scanner" class="text-none" autofocus="autofocus" />
            <img src="../assets/image/qr-code.gif" alt="qr code" width="100%" class="img-qr" />
            <div class="checkin mb-3">
              <button class="btn-camera-scanner" disabled>
                <span class="mx-3"><img src="../assets/image/ionic-ios-camera.svg" alt="checkin-icon" /></span>Scan the QR Code
              </button>
            </div>
          </div>
          <div class="col-md-7 border-left">
            <img :src="global_url + '../assets/image/default.png'" alt="event banner" width="100%" height="100%" />
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
              <!-- <h2 class="mb-3">Welcome {{ scanner_data.guest.fullname }}</h2> -->
              <div class="border-bottom mt-1 mb-1"></div>
              <h3 class="mt-2">"Please wait for your badges to finish printing"</h3>
            </div>
          </div>
          <div class="printable qr-box img-height" id="areaprint" style="margin-top: 0px">
            <center>
              <!-- <img :src=" global_url + scanner_data.guest.guest_qr" width="120" height="120" alt="guest"
                style="margin-top: 170px"/> -->
              <div id="qrcode" style="margin-top: 190px"></div>
              <div class="lh">
                <p class="text-center mb-4 lh">
                  <!-- <b>{{ scanner_data.guest.fullname }}</b> -->
                </p>
                <p class="text-center lh">
                  <!-- <b>{{ scanner_data.guest.ticketclass_name }}</b> -->
                </p>
              </div>
            </center>
          </div>
        </div>
        <div class="form-group">
          <button class="button-done mt-4" @click="toCheckin()">Done Print</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
}

#printable {
  border: 1px solid;
}

.btn-checkin {
  background-color: #25516b;
  color: #fff;
  border-radius: 20px;
  font-size: 20px;
  align-items: center;
  text-align: center;
  border: none;
  padding: 10px;
  font-weight: bold;
  margin: auto;
  margin-top: 24px;
}

span {
  color: #888888;
  font-family: Arial, Helvetica, sans-serif;
}

.h4 {
  color: #fff;
}

.button-done {
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

.qr-box {
  padding: 2pt;
  border-radius: 5pt;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
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
  background: url(../assets/image/bg-agenda-session.png);
}

.text-none {
  border: none;
  color: #fff;
  outline-style: none;
  z-index: -99;
  font-size: 1px;
}

.btn-camera-scanner {
  background-color: #ebebeb;
  color: #25516b;
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

.button-back {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
}

.button-reprint {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 50px;
}

.thankyou {
  color: #315568;
  font-size: 18pt;
}

.bg-white {
  background-color: #fff;
}

.bg-darkblue {
  color: #25516b;
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

.lh {
  line-height: 1pt;
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
  .margin-div {
    display: inline-block;
    margin-top: 500px;
  }

  #qrcode {
    padding-top: 150px;
    display: inline-block;
  }

  .noshow {
    display: inline-block;
  }
}
</style>
