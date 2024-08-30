<template>
  <section class="vh-100">
    <div class="container">
      <div class="row">
        <div class="d-flex">
          <img :src=" this.qr_payment" alt="banner" class="poster-mobile-img m-auto">
        </div>
      </div>
      <div class="d-flex">
        <div class="row m-auto">
          <div class="wrap-countdown">
            <div id="countdown">
              <ul>
                <li><span id="minutes"></span>Minutes</li>
                <li><span id="seconds"></span>Seconds</li>
              </ul>
            </div>
            <div id="coundown-off">
              <ul>
                <li><span id="minutes">00</span>Minutes</li>
                <li><span id="seconds">00</span>Seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="payment-success col-md-9 m-auto mt-4">
        <div class="row align-center">
          <div class="col-md-3">
            <img src="../assets/image/icon-ceklis.png" alt="icon-ceklis" />
          </div>
          <div class="col-md-9">
            <h1 class="text-start py-3">Waiting Payment</h1>
            <span class="thank-you">Thank you for the purchasing, your ticket has been processed, please check your
              email immediately</span>
            <div class="form-group">
              <button data-bs-toggle="modal" data-bs-target="#showdetails_modal" class="btn-done mt-3 mx-1">CANCEL</button>
              <button class="btn-print mt-3" @click="check_status();">PAYMENT STATUS</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL CANCEL-->
      <div class="modal fade" id="showdetails_modal" role="dialog">
        <div class="modal-dialog modal-top modal-top-50">
          <div class="modal-content border-bottom-navy">
            <div class="modal-body">  
              <p class="ppage text-center">Are You Sure?</p>
              <div class="btn-wrap text-center">
                <a class="btn btn-navy-cancel short-btn" data-bs-dismiss="modal">
                  No
                </a>
                <a class="btn btn-navy-cancel short-btn" data-bs-dismiss="modal" @click="payment_cancel();" >
                  Yes
                </a>
              </div>
              <br>
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

  export default {
    data() {
      return {
        event_detail: JSON.parse(localStorage.getItem("event_details")),
        form_payment: {
          transaction_id: localStorage.getItem("transaction_id"),
        },
        form_cancel: {
          transaction_id: localStorage.getItem("transaction_id"),
        },
        urlGateway: JSON.parse(localStorage.getItem("urlGateway")),
        poster_mobile: localStorage.getItem("poster_mobile"),
        qr_payment: localStorage.getItem("qr_payment"),
        check_payment: "",
        cancel_payment: "",
        order_id: localStorage.getItem("order_id"),
        length_ao: "",
        subtotal: "",
        total: "",
        ticket_name: "",
        onhold_msg: "",
        enable_button: true,
        LoadingButton: false,
        isLoadingAnimation: false,
        global_url: this.$globalURL,
        isLoading: false,
        isLoadingHeader: false,
        route_name: this.$route.name,
      };
    },
    components: {

    },
    methods: {
      getUrlGateway() {
        this.Countdown(this.urlGateway.expiry_time);
      },
      check_status() {
        this.isLoadingAnimation = true;
        axios({
          url: "/midtrans/checkpaystatus",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.form_payment,
        }).then((res) => {
          this.check_payment = res.data;
          if (res.data.status_code == 200) {
            Swal.fire({
              title: "Status Transaction :",
              icon: "success",
              text: res.data.transaction_status,
            }).then((value) => {});
          } else {
            this.isLoadingAnimation = false;
            Swal.fire({
              title: "Pending",
              icon: "warning",
              text: res.data.transaction_status,
            }).then((value) => {});
          }
        });
      },
      payment_cancel() {
        this.isLoadingAnimation = true;
        axios({
          url: "/midtrans/cancelpay",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.form_cancel,
        }).then((res) => {
          var is = this;
          if (res.data.status_code == 200) {
            Swal.fire({
              title: "success",
              icon: "success",
              text: res.data.status_message,
            }).then((value) => {
              is.isLoadingAnimation = true;
              is.$router.push("/eventdetailpage");
            });
          } 

          switch (res.data.status) {
            case 200:
              this.checkin_status = true;
              this.on_print();
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
              case "pending":
              this.checkin_status = false;
              Swal.fire({
                title: this.scanner_data.message,
                icon: "info",
              });
              case "settlement":
              this.checkin_status = false;
              Swal.fire({
                title: this.scanner_data.message,
                icon: "info",
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
      formatDate(date) {
        return moment(date).format("dddd, DD MMMM YYYY")
      },

      formatTime(value) {
        return value = value.substring(0, 5);
      },
      Countdown(dateStart) {
        let datestart2 = moment(dateStart).format('MMM DD, YYYY HH:mm:ss');

        function byId(id) {
          return document.getElementById(id);
        }

        function formatTens(n) {
          // format integers to have at least two digits
          return (n < 10) ? '0' + n : '' + n;
        }
        let endDate = new Date(datestart2);
        let myCountdown = countdown(null, endDate);
        setInterval(function () {
          myCountdown = countdown(null, endDate);
          if (myCountdown.start > myCountdown.end) {
            // byId('hours').innerHTML = formatTens(0);
            byId('minutes').innerHTML = formatTens(0);
            byId('seconds').innerHTML = formatTens(0);
          } else {
            // byId('hours').innerHTML = formatTens(myCountdown.hours);
            byId('minutes').innerHTML = formatTens(myCountdown.minutes);
            byId('seconds').innerHTML = formatTens(myCountdown.seconds);
          }
        }, 1000);
      },
    },

    mounted() {
      if (this.event_detail === null) {
        this.$router.push("/eventdetailpage");
      } else {
        this.getUrlGateway()
      }
    },
  };
</script>

<style scoped>
  a {
    text-decoration: none;
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

  .thank-you {
    color: #315568;
    font-size: 1.3rem;
    font-style: italic;
  }

  .btn-done {
    width: 30%;
    background-color: #ffffff;
    color: #2096c1;
    font-family: Helvetica;
    border-radius: 10px;
    font-size: 1rem;
    padding: 5px 0 5px 0;
    font-weight: bold;
    border-color: #2096c1;
  }

  .btn-print {
    width: 40%;
    background-color: #315568;
    color: #fff;
    font-family: Helvetica;
    border-radius: 10px;
    font-size: 1rem;
    padding: 5px 0 5px 0;
    font-weight: bold;
    border-color: #315568;
    text-wrap: nowrap
  }

  .bg-white {
    background-color: #fff;
  }

  .bg-grey {
    background-color: #f8f8f8;
  }

  .align-center {
    align-items: center;
  }

  .text-white {
    color: #fff;
  }

  .poster-mobile-img {
    max-width: 400px;
    max-height: 200px;
  }

  /* Countdown */

  .wrap-countdown {
    margin-top: 2px;
  }

  #headline {
    display: none;
  }

  #countdown ul,
  #coundown-off ul {
    margin-top: 20px;
    padding: 0;
  }

  #countdown ul li,
  #coundown-off ul li {
    display: inline-block;
    font-family: "Edensor";
    font-size: 9pt;
    list-style-type: none;
    padding: 0pt 15pt;
    text-transform: uppercase;
    border-right: 1px solid #000;
    color: #000;
  }

  #countdown ul li:last-child,
  #coundown-off ul li:last-child {
    border-right: none;
  }

  #countdown ul li span,
  #coundown-off ul li span {
    display: block;
    font-family: "Branch";
    font-size: 28pt;
  }

  #coundown-off {
    display: none;
  }

  @media all and (max-width: 768px) {
    .wrap-countdown {
      margin-top: 5px;
    }

    .hashtagwording-style {
      margin-top: 0 !important;
    }

    #countdown ul li,
    #coundown-off ul li {
      font-size: 1rem;

      padding: 5pt 8pt;
    }

    #countdown ul li span,
    #coundown-off ul li span {
      font-size: 1.2rem;
    }
  }
</style>