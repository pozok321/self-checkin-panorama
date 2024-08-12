<template>
  <section class="vh-100 container-fluid">
    <div class="row">
      <div class="col-md-8 p-5 vh-100">
        <div class="justify-content-between flex mb-3" name="cart">
          <div class="my-car mt-4">
            <img src="../assets/image/cart.svg" alt="cart" />
            <span>My Cart</span>
          </div>
          <div class="event-date">
            <p>FLEI EXPO XXII</p>
            <span>18 - 20 November 202</span>
          </div>
        </div>
        <div class="border-bottom mb-3"></div>
        <div class="row">
          <div class="col-md-6">
            <img src="../assets/image/flei-img.png" alt="cart" width="100%" />
          </div>
          <div class="col-md-5 top-50 start-0 m-auto">
            <div class="ticket-title">
              <h4 class="text-start">Ticket FLEI EXPO Day 1</h4>
            </div>
            <div class="border-bottom my-2"></div>
            <div class="row">
              <div class="profile-name">
                <p>Mr. Muhammad Irfan</p>
                <p>muhammadirvan337@gmail.com</p>
                <p>Order ID</p>
                <p>{{this.form_getCart.order_id}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

        <div class="border-bottom mt-5"></div>

        <div class="row col-md-10">
          <h4 class="text-start my-3">EVENT BRIEF</h4>
          <span class="mb-3">FRANCHISE & LICENSE EXPO INDONESIA ( FLEI )</span>
          <div class="term-condition">
            FLEI – Franchise & License Expo Indonesia will be the best gateway for international franchises, brands, and
            licenses that are yet to be in Indonesia, and for Indonesia’s own franchises, brands and licenses are
            looking to expand
            to the entire Indonesia market or ASIA region.
          </div>
        </div>
        <div class="row col-md-10">
          <h4 class="text-start">Edisi ke-20</h4>
          <span>25 - 27 Februari 2022 (3 hari) Jakarta Convention Center (Hall B) Pukul 10.00 - 20.00 WIB</span>
        </div>
      </div>

      <div class="col-md-4 p-5 vh-100">
        <div class="bg-grey order-details">
          <div class="justify-content-between flex mt-3">
            <h2 class="text-start">Add Promo</h2>
            <img src="../assets/image/icon-promo.svg" alt="cart" width="20" />
          </div>
          <div class="border-bottom mt-3"></div>
          <div class="justify-content-between flex mt-3">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Type Promo Code" aria-label="Type Promo Code"
                aria-describedby="button-addon2" />
              <button class="btn btn-outline-secondary promo-button" type="button" id="button-addon2">Submit</button>
            </div>
          </div>
        </div>

        <div class="bg-grey checkout mt-5">
          <div class="row p-3">
            <h4 class="text-start">Check Out</h4>
            <span class="span-checkout">FRANCHISE & LICENSE EXPO INDONESIA ( FLEI )</span>
            <div class="justify-content-between flex mt-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                <label class="form-check-label" for="flexCheckChecked"> Additional Ticket 1 </label>
                <p class="additional-font">Additional Ticket Start 12:00 - 13:30 Pm</p>
              </div>
              <div class="price-addon">
                <p>IDR 10K</p>
              </div>
            </div>
            <div class="justify-content-between flex">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="check1" />
                <label class="form-check-label" for="flexCheckChecked"> Additional Ticket 2 </label>
                <p class="additional-font">Additional Ticket Start 12:00 - 13:30 Pm</p>
              </div>
              <div class="price-addon">
                <p>IDR 10K</p>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="total-payment col-md-6">
              <p>Total Payment</p>
            </div>
            <div class="price col-md-6 p-ticket text-end">
              <div class="price =">IDR 10k</div>
              <span class="span-total-ticket text-end">please check ticket before add to purchase</span>
            </div>
            <div class="total-payment bottom-0 end-0">
              <div class="form-group">
                <button class="btn-purchase mt-4">
                  <span><img src="../assets/image/payment.svg" alt="payment" /></span> Make payment
                </button>
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
  import {
    Form,
    Field,
    ErrorMessage,
  } from 'vee-validate';

  export default {
    data() {
      return {
        form_getCart: {
          events_id: this.$route.params.Eventsid,
          ticketid: JSON.parse(localStorage.getItem("mt_id")),
          ticket_qty: localStorage.getItem("ticket_qty"),
          order_id: localStorage.getItem("order_id"),
        },
        form_getgetFree: {
          events_id: this.$route.params.Eventsid,
          ticketid: JSON.parse(localStorage.getItem("mt_id")),
          ticket_qty: localStorage.getItem("ticket_qty"),
          order_id: localStorage.getItem("order_id"),
          promo_id: '',
        },
        form_promoApply: {
          events_id: this.$route.params.Eventsid,
          ticketid: JSON.parse(localStorage.getItem("mt_id")),
          ticket_qty: localStorage.getItem("ticket_qty"),
          order_id: localStorage.getItem("order_id"),
          coupon: '',
        },
        form_promoDelete: {
          events_id: this.$route.params.Eventsid,
          order_id: localStorage.getItem("order_id"),
        },
        order_id: localStorage.getItem("order_id"),
        event_detail: JSON.parse(localStorage.getItem("event_details")),
        cart_detail: [],
        main_ticket: [],
        addon_ticket: [],
        ticket_ao: [],
        length_ao: '',
        subtotal: '',
        total: '',
        onhold_msg: '',
        enable_button: true,
        form_getticketSession: {
          events_id: this.$route.params.Eventsid,
          ticket_id: '',
        },
        ticket_details: [],
        ticket_session: [],
        msg_notif: '',
        LoadingButton: false,
        isLoadingAnimation: false,
        global_url: this.$globalURL,
        isLoading: false,
        isLoadingHeader: false,
        route_name: this.$route.name
      };
    },
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    methods: {
      isRequired(value) {
        if (!value) {
          return 'this field is required';
        }
        return true;
      },
      getCart() {
        this.topFunction()
        this.isLoadingHeader = true
        this.isLoading = true;
        axios({
            url: "/rsvp/getcheckout",
            headers: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: this.form_getCart,
          })
          .then(res => {
            this.isLoading = false;
            this.isLoadingHeader = false
            if (res.data.status == 201) {
              Swal.fire({
                  title: "Warning",
                  icon: "warning",
                  text: res.data.msg,
                })
                .then((value) => {
                  this.$router.push("/ticketlist/" + this.form_getCart.events_id);
                });
            } else {
              this.cart_detail = res.data;
              this.main_ticket = this.cart_detail.main_ticket;
              this.addon_ticket = this.cart_detail.addon_ticket;
              this.total = this.cart_detail.total_price;
              this.form_getgetFree.promo_id = this.main_ticket.promo_id

              for (let i = 0; i < this.addon_ticket.length; i++) {
                this.ticket_ao[this.addon_ticket[i].ticket_id] = this.addon_ticket[i].selected
                if (this.addon_ticket[i].selected == true) {
                  this.length_ao = this.length_ao + 1
                }
              }
              this.setTitle("Check-Out - " + this.event_detail.event_title + " - Undangin")

              if (this.event_detail.rsvp_counter !== 'O') {
                this.$router.push("/closed/" + this.form_getCart.events_id);
              }
            }
          })
      },
      topFunction() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      setTitle(title_page) {
        document.title = `${title_page}`
      },
      get_infoticket(ticket) {
        this.isLoading = true
        this.form_getticketSession.ticket_id = ticket.ticket_id

        axios({
            url: "/rsvp/ticketsession",
            headers: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: this.form_getticketSession,
          })
          .then(res => {
            this.isLoading = false
            this.ticket_details = res.data
            this.ticket_session = res.data.ticket_session
          })
      },
      formatCurrency(value, currency) {
        if (currency == 'IDR') {
          if (value == 0) {
            return currency = currency + ' ' + value
          } else {
            var number_string = value ? value.toString().replace(/[^,\d]/g, '') : '',
              split = number_string.split(','),
              sisa = split[0].length % 3,
              rupiah = split[0].substr(0, sisa),
              ribuan = split[0].substr(sisa).match(/\d{3}/gi);
            var separator = '';
            // tambahkan titik jika yang di input sudah menjadi angka ribuan
            if (ribuan) {
              separator = sisa ? '.' : '';
              rupiah += separator + ribuan.join('.');
            }

            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
            return currency == undefined ? rupiah : (rupiah ? currency + ' ' + rupiah : '');
          }
        } else {
          return currency + value ? currency + ' ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :
            '';
        }
      },
      kFormatter(num, currency) {
        if (currency == 'IDR') {
          return Math.abs(num) > 999 ? currency + ' ' + Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) +
            'K' : currency + ' ' + Math.sign(num) * Math.abs(num)
        } else {
          return currency + value ? currency + ' ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :
            '';
        }
      },
      close_promo() {
        this.msg_notif = ''
        this.form_promoApply.coupon = ''
      },
      remove_coupon() {
        this.isLoadingAnimation = true;
        axios({
            url: "/rsvp/deletecoupon",
            headers: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: this.form_promoDelete,
          })
          .then(res => {
            this.isLoadingAnimation = false;
            if (res.data.status == 200) {
              document.getElementById("close_deleteCode").click();
              this.getCart()
              Swal.fire({
                  title: "Success",
                  icon: "success",
                  text: res.data.msg,
                })
                .then((value) => {});
            } else {
              var wording = "<span style='color:red; font-size:14px; font-weight:bold'>" + res.data.msg + "<span>."
              Swal.fire({
                  title: "Warning",
                  icon: "warning",
                  html: wording,
                })
                .then((value) => {});
            }
          })
      },
      applyPromo(values) {
        this.isLoadingAnimation = true;
        axios({
            url: "/rsvp/checkcoupon",
            headers: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: this.form_promoApply,
          })
          .then(res => {
            this.isLoadingAnimation = false;
            if (res.data.status == 200) {
              document.getElementById("close_addCode").click();
              this.getCart()
              Swal.fire({
                  title: "Success",
                  icon: "success",
                  text: res.data.msg,
                })
                .then((value) => {});
            } else {
              this.msg_notif = res.data.msg
              var wording = "<span style='color:red; font-size:14px; font-weight:bold'>" + res.data.msg + "<span>."
              Swal.fire({
                  title: "Warning",
                  icon: "warning",
                  html: wording,
                })
                .then((value) => {});
            }
          })
      },
      make_payment() {
        this.isLoadingAnimation = true;
        axios({
            url: "/rsvp/makepayment",
            headers: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: this.form_getCart,
          })
          .then(res => {
            if (res.data.status == 200) {
              localStorage.clear();
              window.location = res.data.urlGateway;
            } else {
              this.isLoadingAnimation = false;
              Swal.fire({
                  title: "Warning",
                  icon: "warning",
                  text: res.data.msg,
                })
                .then((value) => {});
            }
          })
      },
      get_forfree() {
        this.isLoadingAnimation = true;
        axios({
            url: "/rsvp/freeticket",
            headers: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: this.form_getgetFree,
          })
          .then(res => {
            if (res.data.status == 200) {
              localStorage.clear();
              window.location = this.global_url + "/payment/finish?events_id=" + this.form_getCart.events_id;
            } else {
              this.isLoadingAnimation = false;
              Swal.fire({
                  title: "Warning",
                  icon: "warning",
                  text: res.data.msg,
                })
                .then((value) => {});
            }
          })
      }
    },
    mounted() {
      if (this.form_getCart.events_id === null) {
        this.$router.push("/" + this.form_getCart.events_id);
      } else {
        this.getCart();
      }
    },
  };
</script>

<style scoped>
  .order-details,
  .checkout {
    padding: 20px;
    border-radius: 15px;
  }

  .span-checkout {
    font-size: 8px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .border-dash {
    border-style: dashed;
    border-width: thin;
    border-radius: 20px;
  }

  .term-condition {
    max-height: 150px;
    height: 100px;
  }

  .promo-button {
    background-color: #315568;
    color: #fff;
  }

  .term-condition p {
    font-size: 15px;
  }

  .term-condition-date {
    font-weight: bold;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .card-deck {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }

  .btn-purchase {
    width: 100%;
    background-color: #3ab54b;
    color: #fff;
    border-color: #fff;
    font-family: Helvetica;
    border-radius: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16pt;
    font-weight: bold;
  }

  .additional-font {
    font-size: 8px;
  }

  .span-total-ticket {
    color: #dd7223;
    font-size: 7px;
    font-style: italic;
  }

  .price-addon {
    color: #09303e;
    font-size: 14px;
    font-weight: bold;
  }

  .price {
    color: #09303e;
    font-size: 30px;
    font-weight: bold;
  }

  .p-ticket {
    line-height: 10px;
    margin: auto;
  }

  .ticket-buy-center {
    position: absolute;
    left: 50%;
    right: 50%;
    text-align: center;
    align-items: center;
  }

  .btn-checkin {
    background-color: #ebebeb;
    color: #25516b;
    border-radius: 20px;
    font-size: 20px;
    align-items: center;
    text-align: center;
    border: none;
    padding: 10px;
    font-weight: bold;
  }

  .btn-get-ticket {
    width: 100%;
    background-color: #2096c1;
    color: #fff;
    font-family: Helvetica;
    border-radius: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16pt;
    font-weight: bold;
  }

  .bg-registration-page {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
  }

  .form-check-input:checked {
    background-color: #22b473;
    border-color: #22b473;
  }

  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>