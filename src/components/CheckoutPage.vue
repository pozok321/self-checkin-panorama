<template>
  <section class="vh-100 container-fluid">
    <div class="row">
      <div class="col-md-8 p-5 vh-100">
        <div class="justify-content-between d-flex mb-3" name="cart">
          <div class="my-cart">
            <img src="../assets/image/cart.svg" alt="cart" />
            <span class="font-mycart">My Cart</span>
          </div>
          <div class="event-date">
            <p class="font-title-cart">{{ event_detail.event_title }}</p>
            <p>{{ this.event_date }}</p>
          </div>
        </div>
        <div class="border-bottom my-3"></div>
        <div class="row">
          <div class="col-md-6 my-3">
            <img :src="global_url + this.event_detail.poster_mobile" alt="cart" width="100%" />
          </div>
          <div class="col-md-5 top-50 start-0 m-auto">
            <div class="ticket-title">
              <h4 class="text-start">Ticket : {{ this.ticket_name }}</h4>
            </div>
            <div class="border-bottom my-3"></div>
            <div class="row lh-10">
              <div class="profile-name">
                <div class="row">
                  <p>{{ this.fullname }}</p>
                  <p>{{ this.email }}</p>
                </div>
                <div class="row order-id my-2 uid">
                  <p>Order ID</p>
                  <p>{{ this.form_getCart.order_id }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

        <div class="border-bottom"></div>
        <div class="row col-md-10">
          <h4 class="text-start my-3 font-event-brief">EVENT BRIEF</h4>
          <span class="mb-3 font-eventbrief-sub">{{ event_detail.event_title }}</span>
          <div class="term-condition" v-html="event_detail.event_brief" style="color: #707070; font-size: 0.6rem"></div>
        </div>
      </div>

      <div class="col-md-4 p-5">
        <div class="row">
          <div class="bg-grey order-details">
            <div class="justify-content-between d-flex mt-2">
              <h4 class="text-start font-addpromo">Add Promo Code</h4>
              <img src="../assets/image/icon-promo.svg" alt="cart" width="20" />
            </div>
            <div class="border-bottom mt-2"></div>
            <div class="justify-content-between flex mt-3">
              <Form @submit="applyPromo" v-slot="{ errors }">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <Field type="text" class="form-control" name="promo_code" v-model="form_promoApply.coupon" placeholder="Type Promo Code" :class="{ errorfield: errors.promo_code }" />
                    <button class="btn btn-outline-secondary promo-button">
                      <span v-if="LoadingButton">
                        <span class="loader loading-quarter"></span>
                        Processing
                      </span>
                      <span v-else> Apply </span>
                    </button>
                  </div>
                  <ErrorMessage class="notif-verror" name="promo_code" />
                  <div class="notif-verror text-center" v-if="msg_notif">
                    <i>{{ msg_notif }}</i>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          <div class="bg-grey checkout mt-1">
            <div class="row p-3">
              <h4 class="text-start font-checkout">Check Out</h4>
              <span class="span-checkout">{{ event_detail.event_title }}</span>
              <div class="justify-content-between d-flex">
                <div class="price-total">
                  <p class="total-mainticket-price">{{ this.form_getCart.ticket_name }}</p>
                  <p>Quantity : {{ this.form_getCart.ticket_qty }} Ticket</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="total-payment col-md-3">
                <p>Total Payment</p>
              </div>
              <div class="price col-md-9 p-ticket text-end">
                <div class="total-flycart">
                  <div class="is-loading text-30" v-if="isLoading"></div>
                  <div v-else>
                    {{ formatCurrency(total, event_detail.currency) }}
                  </div>
                </div>
              </div>
              <div class="total-payment bottom-0 end-0">
                <div class="form-group">
                  <button class="btn green-btn small-btn" @click="make_payment()" v-if="cart_detail.gratis == false">
                    <span v-if="LoadingButton">
                      <span class="loader loading-quarter"></span>
                      Loading...
                    </span>
                    <span v-else> <i class="bx bx-wallet"></i> Make Payment </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Details Ticket -->
      <div class="modal fade" id="showdetails_modal" role="dialog">
        <div class="modal-dialog modal-top modal-top-50">
          <div class="modal-content border-bottom-navy">
            <div class="modal-body">
              <div class="title-modal-custom">
                <div class="icon-modal"><img src="/src/assets/image/ticket-icon.png" width="39" alt="Ticket" /></div>
              </div>
              <p>&nbsp;</p>
              <div class="is-loading text-30" v-if="isLoading"></div>
              <h4 class="text-center" v-else></h4>
              <p class="ppage text-center" v-if="ticket_details.status == 200">Ticket for :</p>
              <div v-if="ticket_details.status == 200">
                <div class="row marginbtm-5" v-for="session in ticket_session">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-5 time-content">
                    <b>{{ session.start_time }} - {{ session.end_time }}</b>
                  </div>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-7 desc-content">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="session-topic">{{ session.session_topic }}</div>
                        <div class="session-brief">{{ session.session_brief }}</div>
                        <table class="session-table">
                          <tr>
                            <td>Speaker</td>
                            <td>:</td>
                            <td>
                              <div class="speaker-style">
                                <b
                                  >{{ session.speaker_name }} <span v-if="session.speaker_jobtitle !== ''">({{ session.speaker_jobtitle }})</span></b
                                >
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center" v-else>{{ ticket_details.msg }}</div>
              <br />
              <div class="btn-wrap text-center">
                <a class="btn btn-navy-cancel short-btn" data-bs-dismiss="modal"> Close </a>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Add Promo -->
      <div class="modal fade" id="addpromo_modal" role="dialog">
        <div class="modal-dialog modal-top modal-top-50">
          <div class="modal-content border-bottom-navy">
            <div class="modal-body">
              <div class="title-modal-custom">
                <div class="icon-modal"><img src="/src/assets/image/promo-icon.svg" width="100%" alt="Add Promo" /></div>
                <h4>Add Promo</h4>
              </div>
              <p>&nbsp;</p>
              <div class="mt-5">
                <Form @submit="applyPromo" v-slot="{ errors }">
                  <div class="form-group">
                    <Field type="text" class="form-control form-control-custom padding-l-60" name="promo_code" v-model="form_promoApply.coupon" placeholder="Promo Code" :rules="isRequired" :class="{ errorfield: errors.promo_code }" />
                    <span class="promo-icon-form">
                      <img src="/src/assets/image/promo-white-icon.svg" width="100%" alt="Add Promo" />
                    </span>
                    <ErrorMessage class="notif-verror" name="promo_code" />
                    <div class="notif-verror text-center" v-if="msg_notif">
                      <i>{{ msg_notif }}</i>
                    </div>
                  </div>
                  <div class="btn-wrap text-center">
                    <a class="btn btn-navy-cancel short-btn" data-bs-dismiss="modal" id="close_addCode" @click="close_promo()"> Close </a>
                    <button class="btn green-btn short-btn">
                      <span v-if="LoadingButton">
                        <span class="loader loading-quarter"></span>
                        Processing
                      </span>
                      <span v-else> Apply </span>
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal delete Promo -->
      <div class="modal fade" id="deletepromo_modal" role="dialog">
        <div class="modal-dialog modal-top modal-top-50">
          <div class="modal-content border-bottom-navy">
            <div class="modal-body">
              <div class="title-modal-custom">
                <div class="icon-modal"><img src="/src/assets/image/promo-icon.svg" width="100%" alt="Add Promo" /></div>
                <h4><b>Remove Promo</b></h4>
              </div>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <div class="form-group text-center">
                <p><b>Are you sure want to remove promo code?</b></p>
              </div>
              <div class="btn-wrap text-center">
                <a class="btn btn-navy-cancel short-btn" id="close_deleteCode" data-bs-dismiss="modal" @click="close_promo()"> Close </a>
                <button class="btn orange-btn short-btn" @click="remove_coupon()">
                  <span v-if="LoadingButton">
                    <span class="loader loading-quarter"></span>
                    Processing
                  </span>
                  <span v-else> Remove </span>
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
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  data() {
    return {
      event_detail: JSON.parse(localStorage.getItem("event_details")),
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
        promo_id: "",
      },
      form_promoApply: {
        events_id: this.$route.params.Eventsid,
        ticketid: JSON.parse(localStorage.getItem("mt_id")),
        ticket_qty: localStorage.getItem("ticket_qty"),
        order_id: localStorage.getItem("order_id"),
        coupon: "",
      },
      form_promoDelete: {
        events_id: this.$route.params.Eventsid,
        order_id: localStorage.getItem("order_id"),
      },
      order_id: localStorage.getItem("order_id"),
      cart_detail: [],
      main_ticket: [],
      addon_ticket: [],
      ticket_ao: [],
      length_ao: "",
      subtotal: "",
      total: "",
      ticket_name: "",
      event_date: "",
      event_title: "",
      fullname: localStorage.getItem("fullname"),
      email: localStorage.getItem("email"),
      onhold_msg: "",
      enable_button: true,
      form_getticketSession: {
        events_id: this.$route.params.Eventsid,
        ticket_id: "",
      },
      ticket_details: [],
      ticket_session: [],
      msg_notif: "",
      LoadingButton: false,
      isLoadingAnimation: false,
      global_url: this.$globalURL,
      isLoading: false,
      isLoadingHeader: false,
      route_name: this.$route.name,
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
        return "this field is required";
      }
      return true;
    },
    getCart() {
      this.topFunction();
      this.isLoadingHeader = true;
      this.isLoading = true;
      axios({
        url: "/rsvp/getcheckout",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_getCart,
      }).then((res) => {
        this.isLoading = false;
        this.isLoadingHeader = false;
        if (res.data.status == 201) {
          Swal.fire({
            title: "Warning",
            icon: "warning",
            text: res.data.msg,
          }).then((value) => {
            this.$router.push("/ticketlist/" + this.form_getCart.events_id);
          });
        } else {
          this.cart_detail = res.data;
          this.main_ticket = this.cart_detail.main_ticket;
          this.addon_ticket = this.cart_detail.addon_ticket;
          this.total = this.cart_detail.total_price;
          this.event_date = this.cart_detail.event_date;
          this.event_title = this.cart_detail.event_title;
          this.form_getgetFree.promo_id = this.main_ticket.promo_id;
          this.ticket_name = this.main_ticket.ticket_name;

          for (let i = 0; i < this.addon_ticket.length; i++) {
            this.ticket_ao[this.addon_ticket[i].ticket_id] = this.addon_ticket[i].selected;
            if (this.addon_ticket[i].selected == true) {
              this.length_ao = this.length_ao + 1;
            }
          }
          this.setTitle("Check-Out - " + this.event_detail.event_title + " - Undangin");

          if (this.event_detail.rsvp_counter !== "O") {
            this.$router.push("/sucesspage/" + this.form_getCart.events_id);
          }
        }
      });
    },
    topFunction() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    setTitle(title_page) {
      document.title = `${title_page}`;
    },
    get_infoticket(ticket) {
      this.isLoading = true;
      this.form_getticketSession.ticket_id = ticket.ticket_id;

      axios({
        url: "/rsvp/ticketsession",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_getticketSession,
      }).then((res) => {
        this.isLoading = false;
        this.ticket_details = res.data;
        this.ticket_session = res.data.ticket_session;
      });
    },
    formatCurrency(value, currency) {
      if (currency == "IDR") {
        if (value == 0) {
          return (currency = currency + " " + value);
        } else {
          var number_string = value ? value.toString().replace(/[^,\d]/g, "") : "",
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);
          var separator = "";
          // tambahkan titik jika yang di input sudah menjadi angka ribuan
          if (ribuan) {
            separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
          }

          rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
          return currency == undefined ? rupiah : rupiah ? currency + " " + rupiah : "";
        }
      } else {
        return currency + value ? currency + " " + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") : "";
      }
    },
    kFormatter(num, currency) {
      if (currency == "IDR") {
        return Math.abs(num) > 999 ? currency + " " + Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K" : currency + " " + Math.sign(num) * Math.abs(num);
      } else {
        return currency + value ? currency + " " + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") : "";
      }
    },
    close_promo() {
      this.msg_notif = "";
      this.form_promoApply.coupon = "";
    },
    remove_coupon() {
      this.isLoadingAnimation = true;
      axios({
        url: "/rsvp/deletecoupon",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_promoDelete,
      }).then((res) => {
        this.isLoadingAnimation = false;
        if (res.data.status == 200) {
          document.getElementById("close_deleteCode").click();
          this.getCart();
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res.data.msg,
          }).then((value) => {});
        } else {
          var wording = "<span style='color:red; font-size:14px; font-weight:bold'>" + res.data.msg + "<span>.";
          Swal.fire({
            title: "Warning",
            icon: "warning",
            html: wording,
          }).then((value) => {});
        }
      });
    },
    applyPromo(values) {
      this.isLoadingAnimation = true;
      axios({
        url: "/rsvp/checkcoupon",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_promoApply,
      }).then((res) => {
        this.isLoadingAnimation = false;
        if (res.data.status == 200) {
          document.getElementById("close_addCode").click();
          this.getCart();
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res.data.msg,
          }).then((value) => {});
        } else {
          this.msg_notif = res.data.msg;
          var wording = "<span style='color:red; font-size:14px; font-weight:bold'>" + res.data.msg + "<span>.";
          Swal.fire({
            title: "Warning",
            icon: "warning",
            html: wording,
          }).then((value) => {});
        }
      });
    },
    make_payment() {
      this.isLoadingAnimation = true;
      axios({
        url: "/rsvp/kioskpay",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_getCart,
      }).then((res) => {
        this.form_getCart = res.data;
        this.urlGateway = this.form_getCart.urlGateway;
        this.transaction_id = this.urlGateway.transaction_id;
        this.qr = this.urlGateway.qr;
        console.log(this.urlGateway, "urlgateway");
        if (form_getCart.status == 200) {
          this.$router.push("/waitingpaymentpage/" + this.form_Reg.events_id);
        } else {
          this.isLoadingAnimation = false;
          Swal.fire({
            title: "Warning",
            icon: "warning",
            text: res.data.msg,
          }).then((value) => {});
        }
      });
    },
    get_forfree() {
      this.isLoadingAnimation = true;
      axios({
        url: "/rsvp/freeticket",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_getgetFree,
      }).then((res) => {
        if (res.data.status == 200) {
          // localStorage.clear();
          window.location = this.global_url + "/payment/finish?events_id=" + this.form_getCart.events_id;
        } else {
          this.isLoadingAnimation = false;
          Swal.fire({
            title: "Warning",
            icon: "warning",
            text: res.data.msg,
          }).then((value) => {});
        }
      });
    },
  },
  mounted() {
    if (this.event_detail === null) {
      this.$router.push("/eventdetailpage");
    } else {
      this.getCart();
    }
  },
};
</script>

<style scoped>
.bg-grey {
  background-color: #f8f8f8;
}

.order-details,
.checkout {
  padding: 20px;
  border-radius: 15px;
}

.font-mycart {
  color: #09303e;
  font-size: 1.6rem;
  font-weight: bold;
}

.font-title-cart {
  color: #09303e;
  font-size: 1rem;
  font-weight: bold;
}

.font-event-brief {
  color: #315568;
  font-size: 1.3rem;
  font-weight: bold;
}

.font-eventbrief-sub {
  color: #315568;
  font-size: 1.1rem;
}

.font-addpromo {
  color: #315568;
  font-size: 1.2rem;
  font-weight: bold;
}

.font-checkout {
  color: #09303e;
  font-size: 1.5rem;
  font-weight: bold;
}

.span-checkout {
  font-size: 8px;
  font-family: Arial, Helvetica, sans-serif;
}

.total-mainticket-price {
  color: #09303e;
  font-size: 20px;
  font-weight: bold;
}

.term-condition {
  max-height: 150px;
  height: 100px;
  font-size: 0.6rem;
  font-weight: lighter;
}
.promo-button {
  background-color: #315568;
  color: #fff;
}

.date,
.uid {
  font-weight: bold;
  font-size: 1rem;
}

.p-ticket {
  line-height: 10px;
  margin: auto;
}

.lh-10 {
  line-height: 10px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
