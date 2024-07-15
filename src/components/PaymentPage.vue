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
                <p>UD20220722741944787</p>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

        <div class="border-bottom my-5"></div>

        <div class="row col-md-10">
          <h4 class="text-start my-3">EVENT BRIEF</h4>
          <span class="mb-3">FRANCHISE & LICENSE EXPO INDONESIA ( FLEI )</span>
          <div class="term-condition">
            FLEI – Franchise & License Expo Indonesia will be the best gateway for international franchises, brands, and licenses that are yet to be in Indonesia, and for Indonesia’s own franchises, brands and licenses are looking to expand
            to the entire Indonesia market or ASIA region.
          </div>
        </div>
        <div class="row col-md-10">
          <h4 class="text-start">Edisi ke-20</h4>
          <div class="term-condition term-condition-date">25 - 27 Februari 2022 (3 hari) Jakarta Convention Center (Hall B) Pukul 10.00 - 20.00 WIB</div>
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
              <input type="text" class="form-control" placeholder="Type Promo Code" aria-label="Type Promo Code" aria-describedby="button-addon2" />
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

export default {
  data() {
    return {
      url: "",
      zpl_printer: "",
      thermal_printer: "",
      showOnMedia: "",
      venue_id: "",
      session_topic: "",
      prev_action: "",
      ticket_id: "",
      ticket_list: "",
      multiple_session_entry: "",
      qr_setting: "",
      ticket: "",
      global_url: this.$globalURL,
      obj: {
        prev_action: "",
        events_id: "",
        ticket_level: "MT",
      },
    };
  },
  components: {},
  methods: {
    ticketList() {
      axios({
        method: "POST",
        url: "/rsvp/ticketlist",
        data: this.obj,
        headers: {
          "Content-Type": "text/plain",
        },
      }).then((res) => {
        this.ticket = res.data;
        console.log(this.ticket, "test123");
      });
    },

    simpanData() {
      localStorage.zpl_printer = this.zpl_printer;
      localStorage.thermal_printer = this.thermal_printer;
      console.log("data berhasil disimpan");
    },
    hapusData() {
      localStorage.removeItem = this.zpl_printer;
      localStorage.removeItem = this.thermal_printer;
    },
  },
  mounted() {
    this.events_id = $cookies.get("events_id");
    if (localStorage.zpl_printer) {
      this.zpl_printer = localStorage.zpl_printer;
    }
    if (localStorage.thermal_printer) {
      this.thermal_printer = localStorage.thermal_printer;
    }

    if (this.events_id == null) {
      Swal.fire({
        title: "Your Session is Expired!",
        icon: "warning",
      });
      setTimeout(1000);
      this.$router.push("/");
    } else {
      this.getCookie();
    }
    this.ticketList();
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
}

.bg-white {
  background-color: #fff;
}

.bg-grey {
  background-color: #f8f8f8;
}

.text-white {
  color: #fff;
}

.flex {
  display: flex;
}

.event-date {
  line-height: 10px;
}

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
