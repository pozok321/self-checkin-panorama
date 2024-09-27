<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 p-3 p-md-5">
        <div class="d-flex justify-content-between align-items-center mb-3" name="cart">
          <div class="my-cart d-flex align-items-center">
            <img src="../assets/image/cart.svg" alt="cart" class="me-2" />
            <span class="font-mycart">My Cart</span>
          </div>
          <div class="event-date text-end">
            <p class="font-title-cart mb-0">{{ event_detail.event_title }}</p>
            <p class="mb-0">{{ event_date }}</p>
          </div>
        </div>
        <div class="border-bottom mb-3"></div>
        <div class="row">
          <div class="col-12 col-md-6 mb-3 mb-md-0">
            <img :src="global_url + event_detail.poster_mobile" alt="cart" class="img-fluid" />
          </div>
          <div class="col-12 col-md-6">
            <div class="ticket-title">
              <h4 class="text-start">Ticket: {{ ticket_name }}</h4>
            </div>
            <div class="border-bottom my-3"></div>
            <div class="profile-name">
              <p>{{ fullname }}</p>
              <p>{{ email }}</p>
            </div>
            <div class="order-id my-2 uid">
              <p>Order ID</p>
              <p>{{ form_getCart.order_id }}</p>
            </div>
          </div>
        </div>
        <div class="border-bottom my-3"></div>
        <div class="row">
          <div class="col-12">
            <h4 class="text-start my-3 font-event-brief">EVENT BRIEF</h4>
            <span class="mb-3 font-eventbrief-sub d-block">{{ event_detail.event_title }}</span>
            <div class="term-condition" v-html="event_detail.event_brief" style="color: #707070; font-size: 0.8rem"></div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 p-3 p-md-5">
        <div class="bg-grey order-details mb-3">
          <div class="d-flex justify-content-between align-items-center mt-2">
            <h4 class="font-addpromo mb-0">Add Promo Code</h4>
            <img src="../assets/image/icon-promo.svg" alt="cart" width="20" />
          </div>
          <div class="border-bottom mt-2"></div>
          <div class="mt-3">
            <Form @submit="applyPromo" v-slot="{ errors }">
              <div class="form-group">
                <div class="input-group mb-3">
                  <Field type="text" class="form-control" name="promo_code" v-model="form_promoApply.coupon" placeholder="Type Promo Code" :class="{ 'is-invalid': errors.promo_code }" />
                  <button class="btn btn-outline-secondary promo-button">
                    <span v-if="LoadingButton">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Processing
                    </span>
                    <span v-else> Apply </span>
                  </button>
                </div>
                <ErrorMessage class="invalid-feedback" name="promo_code" />
                <div class="text-danger text-center" v-if="msg_notif">
                  <i>{{ msg_notif }}</i>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div class="bg-grey checkout">
          <h4 class="text-start font-checkout mb-2">Check Out</h4>
          <span class="span-checkout d-block mb-3">{{ event_detail.event_title }}</span>
          <div class="d-flex justify-content-between mb-3">
            <div class="price-total">
              <p class="total-mainticket-price mb-0">
                {{ form_getCart.ticket_name }}
              </p>
              <p class="mb-0">Quantity: {{ form_getCart.ticket_qty }} Ticket</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <p class="mb-0">Total Payment</p>
            <div class="price text-end">
              <div v-if="isLoading" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div v-else class="total-flycart">
                {{ formatCurrency(total, event_detail.currency) }}
              </div>
            </div>
          </div>
          <div class="text-center" v-if="cart_detail.gratis == false">
            <button class="btn green-btn w-100" @click="make_payment()" :disabled="LoadingButton">
              <span v-if="LoadingButton">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </span>
              <span v-else> <i class="bx bx-wallet"></i> Make Payment </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modals -->
  <!-- ... (keep the existing modals) ... -->
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
      form_getCheckout: {
        events_id: this.$route.params.Eventsid,
        ticketid: JSON.parse(localStorage.getItem("mt_id")),
        ticket_qty: localStorage.getItem("ticket_qty"),
        order_id: localStorage.getItem("order_id"),
      },
      order_id: localStorage.getItem("order_id"),
      cart_detail: [],
      main_ticket: [],
      addon_ticket: [],
      ticket_ao: [],
      urlGateway: [],
      evidenc:"",
      checkout_detail: "",
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
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res.data.msg,
          }).then((value) => {
            this.isLoadingAnimation = true;
          });
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
        data: this.form_getCheckout,
      }).then((res) => {
        this.checkout_detail = res.data;
        this.evidenc = this.checkout_detail.evidenc;
        this.urlGateway = this.checkout_detail.urlGateway;
        this.transaction_id = this.urlGateway.transaction_id;
        this.qr = this.urlGateway.qr;
        if (this.checkout_detail.status == 200) {
          localStorage.setItem("transaction_id", this.transaction_id);
          localStorage.setItem("evidenc", this.evidenc);
          localStorage.setItem("qr_payment", this.qr);
          localStorage.setItem("urlGateway", JSON.stringify(this.urlGateway));
          this.$router.push("/paymentstatuspage/" + this.form_getCheckout.events_id);
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
  border-radius: 15px;
  padding: 20px;
}

.font-mycart {
  color: #09303e;
  font-size: 1.2rem;
  font-weight: bold;
}

.font-title-cart {
  color: #09303e;
  font-size: 0.9rem;
  font-weight: bold;
}

.font-event-brief {
  color: #315568;
  font-size: 1.1rem;
  font-weight: bold;
}

.font-eventbrief-sub {
  color: #315568;
  font-size: 1rem;
}

.font-addpromo {
  color: #315568;
  font-size: 1.1rem;
  font-weight: bold;
}

.font-checkout {
  color: #09303e;
  font-size: 1.3rem;
  font-weight: bold;
}

.span-checkout {
  font-size: 0.8rem;
  color: #6c757d;
}

.total-mainticket-price {
  color: #09303e;
  font-size: 1.1rem;
  font-weight: bold;
}

.term-condition {
  max-height: 150px;
  overflow-y: auto;
}

.promo-button {
  background-color: #315568;
  color: #fff;
}

.green-btn {
  background-color: #28a745;
  color: #fff;
}

@media (max-width: 768px) {
  .font-mycart {
    font-size: 1rem;
  }

  .font-title-cart {
    font-size: 0.8rem;
  }

  .font-event-brief {
    font-size: 1rem;
  }

  .font-eventbrief-sub {
    font-size: 0.9rem;
  }

  .font-addpromo {
    font-size: 1rem;
  }

  .font-checkout {
    font-size: 1.1rem;
  }

  .total-mainticket-price {
    font-size: 1rem;
  }
}
</style>
