<template>
  <section class="vh-100">
    <div class="d-flex">
      <img src="../assets/image/banner.png" alt="banner" width="100%" />
    </div>
    <div class="container">
      <div class="payment-success col-md-9 m-auto mt-5">
        <div class="row align-center">
          <div class="col-md-3">
            <img src="../assets/image/icon-ceklis.png" alt="icon-ceklis" />
          </div>
          <div class="col-md-9">
            <h1 class="text-start py-3">waiting payment</h1>
            <span>PLEASE CHECK YOUR PAYMENT STATUS</span>
            <div class="form-group">
              <button class="btn-done mt-4 mx-3">CANCEL</button>
              <button class="btn-print mt-4">PAYMENT STATUS</button>
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
      form_getCart: {
        events_id: this.$route.params.Eventsid,
        ticketid: JSON.parse(localStorage.getItem("mt_id")),
        ticket_qty: localStorage.getItem("ticket_qty"),
        order_id: localStorage.getItem("order_id"),
      },
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
  components: {},
  methods: {
    make_payment() {
      this.isLoadingAnimation = true;
      axios({
        url: "/midtrans/checkpaystatus",
        headers: {
          "Content-Type": "text/plain",
        },
        method: "POST",
        data: this.form_getCart,
      }).then((res) => {
        if (res.data.status == 200) {
          this.form_getCart = res.data;
          console.log(form_getCart, "payment status");
          // this.$router.push("/waitingpaymentpage/" + this.form_Reg.events_id);
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
    this.events_id = $cookies.get("events_id");
    if (this.events_id == null) {
      Swal.fire({
        title: "Your Session is Expired!",
        icon: "warning",
      });
      this.$router.push("/");
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

.btn-done {
  width: 25%;
  background-color: #ffffff;
  color: #2096c1;
  font-family: Helvetica;
  border-radius: 10px;
  font-size: 16pt;
  padding: 5px 0 5px 0;
  font-weight: bold;
  border-color: #2096c1;
}

.btn-print {
  width: 25%;
  background-color: #315568;
  color: #fff;
  font-family: Helvetica;
  border-radius: 10px;
  font-size: 16pt;
  padding: 5px 0 5px 0;
  font-weight: bold;
  border-color: #315568;
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

.banner-flex {
  display: flex;
  margin: 0;
}

.container-banner img {
  background-size: cover;
  background-position: center;
  background-image: -moz-linear-gradient();
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

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
