<template>
  <section class="vh-100">
    <loading v-model:active="isLoading" />
    <div class="content-limit">
      <div class="wrap-content bg-white">
        <div class="formRSVP">
          <h4 class="text-center">Ticket List</h4>
          <div class="order-id text-center">
            <p>Order ID</p>
          </div>
          <div class="row guest-wrap">
            <div class="guest-box" v-for="showReceiptData in receipt">
              <div class="row">
                <div class="col-lg-6 col-sm-7 col-7">
                  <div class="fontblack-12pt">
                    {{ showReceiptData.fullname }}
                  </div>
                  <div class="fontgrey-12pt">
                    {{ showReceiptData.ticket_name}}
                  </div>
                </div>
                <div class="col-lg-6 col-sm-4 col-4 text-end">
                  <button class="btn btn-choose" @click="details(showReceiptData)">Detail ticket</button>
                  <button class="btn btn-choose" @click="select_details(showReceiptData)">Print QR<img
                      src="../assets/image/check-in.png" width="15" alt="Ticket"
                      style="background-color: #fff"></button>
                </div>
              </div>
            </div>
            <div class="qr-box text-center noshow" id="areaprint" v-if="printarea">
              <div class="is-loading img-height" v-if="isLoading"></div>
              <center>
                <div class="margin-div"></div>
                <div id="qrcode"></div>
                <div class="">
                  <div class="mb-4" v-if="this.receipt.var_number == 3">
                    <p>{{this.receipt.var1}}</p>
                    <p>{{this.receipt.var2}}</p>
                    <p>{{this.receipt.var3}}</p>
                  </div>
                  <div class="mb-4" v-else-if="this.receipt.var_number == 2">
                    <p>{{this.receipt.var1}}</p>
                    <p>{{this.receipt.var2}}</p>
                  </div>
                  <div class="mb-4" v-else>
                    <p>{{this.receipt.var1}}</p>
                  </div>
                </div>
              </center>
            </div>
            <div class="row">
              <div class="w-100">
                <button class="btn-done-print" @click="toEventDetailPage()">Done Checkin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="ticketdetail">
      <div class="content-limit">
        <div class="wrap-content bg-white">
          <div class="formRSVP" v-if="ticketlist">
            <h4 class="titlepage text-center">
              <b>Ticket List</b>
            </h4>
            <div class="is-loading text-30" v-if="isLoading"></div>
            <div v-else>
              <p class="ppage text-center">Order ID : {{this.show_qr.order_id}}</p>
            </div>
          </div>
          <div class="formRSVP">
            <div class="row">
              <div class="col-8">
                <h4 class="text-left"><b>Detail Ticket</b></h4>
                <div>Full Name</div>
                <div class="is-loading text-30" v-if="isLoading"></div>
                <div class="mb-2" v-else><b>{{receipt_details.fullname}}</b></div>
                <div>Ticket Class</div>
                <div class="mb-2 text-left">
                  <ul class="ppage" style="padding-left:15px">
                    <li class="text-left">
                      <b>{{receipt_details.tickets.ticket_name}}</b>
                    </li>
                  </ul>
                </div>
                <div>Order ID</div>
                <div class="is-loading text-30" v-if="isLoading"></div>
                <div class="mb-2" v-else><b>{{this.show_qr.order_id}}</b></div>
              </div>
              <div class="col-4">
                <div class="qr-box text-center" id="areaprint">
                  <div class="is-loading img-height" v-if="isLoading"></div>
                  <center>
                    <div class="margin-div"></div>
                    <div id="qrcode"></div>
                    <div class="noshow">
                      <div class="mb-4"><b>{{receipt_details.fullname}}</b></div>
                      <div class="text-center">
                        <b>{{receipt_details.ticket_name}}</b>
                      </div>
                    </div>
                  </center>
                </div>
                <div v-if="isLoading">
                  <div class="is-loading text-30"></div>
                  <div class="is-loading text-30"></div>
                </div>
                <div v-else>
                  <!-- {{ member_detail }} -->
                  <div class="tokencopy-wrap" @click="copy_membertoken()" style="margin-top: 0;">
                    <input type="text" class="form-control form-custom form-8pt"
                      style="position: absolute; top: -2000px;" :value="receipt_details.guests_token" id="member_token"
                      readonly>
                    <button class="btn btn-print font-12ptwhite copy-btn" @click="copy_membertoken()">
                      Copy Token
                      <i class='bx bxs-copy-alt'></i>
                    </button>
                  </div>
                </div>
                <br>
              </div>
            </div>
            <div style="font-size:12px; margin-top:20px">
              <h4 style="font-size:14px; font-weight:bold">Syarat & Ketentuan :</h4>
              <p><b>JANGAN MEMBAGIKAN BARCODE E-TICKET ANDA SECARA ONLINE KARENA ORANG DAPAT MENYALIN DAN
                  MENGKLAIM TIKET ANDA.</b></p>
              <ol style="font-size:12px; font-weight:normal; padding-left: 15px;">
                <li> Kami tidak bertanggung jawab atas kehilangan e-ticket ini</li>
                <li> E-ticket hanya dapat digunakan oleh 1 orang</li>
                <li> E-ticket ditukarkan dengan tanda masuk saat di venue</li>
              </ol>
            </div>
            <div class="btn-wrap text-center">
              <!-- <button class="btn btn-print" @click="on_print()">
                Print QR
              </button> -->
              <a class="btn btn-navy-cancel" @click="clear_qr()">
                Close
              </a>
            </div>
            <br>
          </div>
          <button @click="topFunction()" id="myBtn" title="Go to top">
            <i class='bx bxs-chevron-up'></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import $ from "jquery";
  import Loading from 'vue-loading-overlay';
  import {
    Form,
    Field,
    ErrorMessage
  } from 'vee-validate';
  export default {
    data() {
      return {
        event_detail: JSON.parse(localStorage.getItem("event_details")),
        urlGateway: JSON.parse(localStorage.getItem("urlGateway")),
        poster_mobile: localStorage.getItem("poster_mobile"),
        receipt_data: {
          events_id: this.$route.params.Eventsid,
          order_id: localStorage.getItem("order_id"),
          queue_id : JSON.parse(localStorage.getItem("queue_id")),
        },
        show_qr: {
          evidenc: localStorage.getItem("evidenc"),
          order_id: localStorage.getItem("order_id"),
          guests_token: localStorage.getItem("token"),
        },
        ticket_name: "",
        global_url: this.$globalURL,
        receipt: [],
        ticket_list: [],
        member_data: [],
        member_detail: [],
        receipt_details: [],
        isLoading: false,
        isLoadingHeader: false,
        ticketlist: true,
        ticketdetail: false,
        LoadingButton: false,
        isLoadingAnimation: false,
        route_name: this.$route.name,
        printarea: false
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
      Loading
    },
    methods: {
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
      getUrlGateway() {
        this.Countdown(this.urlGateway.expiry_time);
      },
      clear_qr() {
        $("#qrcode").empty();
        this.ticketlist = true
        this.ticketdetail = false
      },
      receiptList() {
        this.isLoadingAnimation = true;
        axios({
          url: "/rsvp/getpaidticket",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.receipt_data,
        }).then((res) => {
          this.receipt = res.data;
        });
      },
      copy_membertoken() {
        // Get the text field
        var copyText = document.getElementById("member_token");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        // Alert the copied text
        Swal.fire({
            text: "Success, copied token!",
            icon: "success",
          })
          .then((value) => {});

        setTimeout(function () {
          $(".swal-button--confirm").click();
        }, 1000);
      },

      topFunction() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },

      toEventDetailPage() {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You will be directed to Registration Page",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Success",
              text: "You're Success directed to Registration/Checkin Page",
              icon: "success"
            });
            localStorage.clear();
            setTimeout(function () {
              var is = this
              localStorage.settItem("scanner_name",is.scanner_name);
           }, 5000);
            this.$router.push("/eventdetailpage");
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              icon: "error"
            });
          }
        });
      },

      details(receiptData) {
        this.show_qr.guests_token = receiptData.token;
        this.isLoadingAnimation = true;
        axios({
          url: "/rsvp/receipt/details",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.show_qr,
        }).then((res) => {
          this.receipt_details = res.data
          this.ticketdetail = true
          this.ticketlist = false
          this.isLoadingHeader = false
          var is = this
          setTimeout(function () {
            is.isLoading = false
            const qrcode = new QRCode(document.getElementById('qrcode'), {
              text: receiptData.token,
              width: 80,
              height: 80,
              colorDark: '#000',
              colorLight: '#fff',
              correctLevel: QRCode.CorrectLevel.H
            });
          }, 200);
        })
      },

      select_details(receipt_data) {
        $("#qrcode").empty();
        this.printarea = true
        this.receipt_details = receipt_data
        setTimeout(function () {
          const qrcode = new QRCode(document.getElementById('qrcode'), {
            text: receipt_data.token,
            width: 80,
            height: 80,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
          });
        }, 200);
        this.on_print()
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
      if (this.event_detail === null) {
        this.$router.push("/eventdetailpage");
      } else {
        this.receiptList();
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

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0px;
    text-align: center;
    color: #315568;
    font-weight: bold;
  }

  .btn-print {
    width: 100%;
    padding: 10px;
    font-size: 14pt;
    color: #fff;
    border-radius: 12pt;
    background-color: #315568;
  }

  .content-limit {
    position: relative;
    width: 100%;
  }

  .fontblack-12pt {
    font-family: PlusJakartaSans;
    font-weight: 700;
    font-size: 12pt;
    color: #000;
    line-height: 1;
  }

  .fontgrey-12pt {
    font-family: PlusJakartaSans;
    font-size: 12pt;
    color: #9a9a9a;
  }

  .formRSVP {
    margin: auto;
    width: 100%;
    max-width: 600px;
    padding: 30px 20px;
    position: relative;
    box-shadow: 0 3px 6px #00000029;
    border-radius: 20px;
  }

  .my-actions {
    margin: 2em 2em 0;
  }

  .order-1 {
    order: 1;
  }

  .order-2 {
    order: 2;
  }

  .order-3 {
    order: 3;
  }

  .right-gap {
    margin-right: auto;
  }

  .wrap-content {
    position: absolute;
    top: -20px;
    width: 100%;
    min-height: 800px;
    background: #f2f5f8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 3px 6px #00000029;
  }

  .bg-white {
    background-color: #fff;
  }

  .guest-box {
    font-size: 10pt;
    padding: 15pt;
    margin-bottom: 10pt;
    border-radius: 7pt;
    background: #f2f5f8;
  }

  .guest-wrap {
    margin: 10px 0 100px;
  }

  .tokencopy-wrap {
    position: relative;
    margin-top: 25px;
  }

  .tokencopy-wrap input {
    font-style: italic;
  }

  .form-8pt {
    padding: 10px;
    height: 33px;
    font-size: 9.5pt;
  }

  .tokencopy-wrap .btn-customcopy {
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 8pt;
    height: 33px;
    border-radius: 13px;
    background: #ccc;
    color: #151515;
  }

  .form-control:disabled,
  .form-control[readonly] {
    background-color: #e9ecef;
    opacity: 1;
  }

  .qr-box {
    padding: 2pt;
    border-radius: 5pt;
    box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  }

  .ppage {
    font-family: 'PlusJakartaSans';
    font-weight: 500;
    font-size: 12pt;
    color: #09303E;
  }

  .inline-block {
    display: inline-block;
  }

  .btn-choose {
    width: auto;
    max-width: auto;
    padding: 8px;
    font-size: 12px;
    color: #FFFFFF;
    border-radius: 20px;
    background: #315568;
    margin: 2px;
  }


  .btn-details {
    width: 100%;
    max-width: auto;
    padding: 8px;
    font-size: 12px;
    color: #315568;
    border-radius: 20px;
    background: #FFFFFF;
    margin: 2px;
  }

  .btn-done-print {
    width: 100%;
    max-width: auto;
    padding: 8px;
    font-size: 12px;
    color: #FFFFFF;
    border-radius: 20px;
    background: #315568;
    margin: 2px;
  }

  :where([autocomplete=one-time-code]) {
    --otp-digits: 6;
    --otp-ls: 2ch;
    --otp-gap: 1.25;

    /* private consts */
    --_otp-bgsz: calc(var(--otp-ls) + 1ch);
    --_otp-digit: 0;

    all: unset;
    background:
      linear-gradient(90deg,
        var(--otp-bg, #BBB) calc(var(--otp-gap) * var(--otp-ls)),
        transparent 0),
      linear-gradient(90deg,
        var(--otp-bg, #EEE) calc(var(--otp-gap) * var(--otp-ls)),
        transparent 0);
    background-position: calc(var(--_otp-digit) * var(--_otp-bgsz)) 0, 0 0;
    background-repeat: no-repeat, repeat-x;
    background-size: var(--_otp-bgsz) 100%;
    caret-color: var(--otp-cc, #222);
    caret-shape: block;
    clip-path: inset(0% calc(var(--otp-ls) / 2) 0% 0%);
    font-family: ui-monospace, monospace;
    font-size: var(--otp-fz, 2.5em);
    inline-size: calc(var(--otp-digits) * var(--_otp-bgsz));
    letter-spacing: var(--otp-ls);
    padding-block: var(--otp-pb, 1ch);
    padding-inline-start: calc(((var(--otp-ls) - 1ch) / 2) * var(--otp-gap));
  }

  .copy-btn {
    border-radius: 0px 0 5pt 5pt;
    padding: 5px;
  }

  .noshow {
    display: none;
  }

  .margin-div {
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