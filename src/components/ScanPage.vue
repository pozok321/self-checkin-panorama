<template>
  <section class="vh-100 bg-agenda-session" style="background-color: #f1f1f1" v-if="checkin_status == false">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-6 col-lg-8 col-xl-8">
        <div class="text-center">
          <div class="col-md-12 bg-white container-border-bottom align-items-center row">
            <div class="col-md-6">
              <input type="text" id="scanner" class="text-none" />
              <img src="../assets/image/qr-code.gif" alt="qr code" width="100%" class="img-qr" />
            </div>
            <div class="col-md-6 border-left">
              <h1>Tap your QR to scanner</h1>
              <span> Please wait till your QR show the details information </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="vh-100 bg-guest-detail" style="background-color: #f1f1f1" v-else>
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-6 col-lg-6 col-xl-8">
        <div class="row text-center">
          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card bg-profile container-border-profile h-100 w-100">
              <div class="card-body">
                <img src="../assets/image/guest.png" alt="guest" width="100" class="mt-2" />
                <div class="row">
                  <div class="checkin mb-4 text-center"  id="areaprint">
                    <h1>{{ scanner_data.guest.fullname }}</h1>
                    <p>Ticket Name : {{ scanner_data.guest.ticketclass_name }}</p>
                    <p>Email : {{ scanner_data.guest.email }} </p>
                    <div class="registration">
                    <img src="../assets/image/qr.png" alt="guest" class="img-print" />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 d-flex align-items-stretch">
            <div class="card container-border-details h-100 w-100">
              <div class="card-body">
                <h2 class="mt-3 mx-5">{{ scanner_data.message }}</h2>
                <div class="account-details mx-4">
                  <h4>Mobile Phone</h4>
                  <p>{{ scanner_data.guest.phone_full }}</p>
                </div>
                <div class="account-details mx-4">
                  <h4>Group</h4>
                  <p>{{ scanner_data.guest.group_name }}</p>
                </div>
                <div class="account-details mx-4">
                  <h4>Max Pax</h4>
                  <p>{{ scanner_data.guest.max_pax }}</p>
                </div>
                <div class="account-details mx-4">
                  <h4>Table Seat</h4>
                  <p>{{ scanner_data.guest.tableseat_name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row text-center align-center p-2">
            <div class="col-md-6"><img src="../assets/image/thankyou.png" alt="thankyou" width="100" /><span
                class="thankyou">Thankyou !!</span></div>
            <div class="col-md-6">
              <button class="button-finish mt-4 w-100" @click="on_print();">Print</button>
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
  import { HtmlToPaper } from "vue-html-to-paper";

  export default {
    data() {
      return {
        checkin_status: false,
        obj: {
          agenda_id: "",
          session_id: "",
          guests_token: "",
          scanner_name:"A",
          scan_source: "SS",
          events_id: "",
          track_id:""
        },
      };
    },
    components: {},
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
            "x-api-key": this.token,
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
            "x-api-key": this.token,
          },
        }).then((res) => {
          this.track = res.data;
          console.log("track", this.track);
        });
        
      },

      getSession() {
        axios({
          method: "GET",
          url: "/selfsvc/event/" + this.events_id + "/agenda/" + this.agenda_id + "/track/" + this.track_id + "/session",
          headers: {
            "Content-Type": "text/plain",
            "x-api-key": this.token,
          },
        }).then((res) => {
          this.session = res.data;
        });
      },

      on_scanner() {
        setTimeout(function () {
          $("#scanner").trigger("focus");
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
          method: "post",
          url: "/guest/scan/checkin",
          data: this.obj,
          headers: {
            "Content-Type": "text/plain",
          },
        }).then((res) => {
          this.on_scanner();
          this.scanner_data = res.data;
          this.guests_token_scan = this.scanner_data.guests_token;
          if (this.scanner_data.message === "Welcome") {
            this.checkin_status = true;
            
          } else {
            this.checkin_status = false;
          }
        });
      },

      finishScan() {
        this.$router.push("/scanpage");
      },

      on_print() {
        setTimeout(function () {
          var contents = document.getElementById("areaprint").innerHTML;
            var frame1 = document.createElement('iframe');
           frame1.name = "frame1";
           frame1.style.position = "absolute";
           frame1.style.top = "-1000000px";
           document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
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
           window.onload=function(){self.print();} 
            return false;
        }, 500);
        // HtmlToPaper.on_print(this.$areaprint);
      },
     
    },
    directives:{
      HtmlToPaper
    },

    mounted() {
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

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    color: #888888;
    font-family: Arial, Helvetica, sans-serif;
  }

  h1 {
    margin-bottom: 0px;
    text-align: center;
    font-weight: bold;
    color: #163c56;
    font-family: helvetica;
  }

  .text-none {
    border: none;
    color: #fff;
    outline-style: none;
  }

  #scanner:focus {
    border-color: #fff;
    color: #fff;
  }

  .img-qr {
    padding: 4rem;
  }
  .img-print{
    max-width: inherit;
    width: inherit;
  }

  .thankyou {
    color: #315568;
    font-size: 18pt;
  }

  .bg-white {
    background-color: #fff;
  }

  .container-border-bottom {
    border-width: thin;
    border-radius: 20px;
    border-bottom: 10px solid;
    border-color: #5697b2;
  }

  .border-left {
    border-left: 10px solid;
    align-items: left;
    height: 50;
    padding-top: 50px;
    padding-bottom: 50px;
    border-color: #163c56;
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

  .checkin h1,
  span {
    color: #fff;
    font-family: Helvetica;
  }

  .text-center {
    text-align: center;
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
  
</style>