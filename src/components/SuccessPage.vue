<template>
  <section class="vh-100">
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
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
            <h1 class="text-start py-3">Payment Success, Thank you</h1>
            <span>Thank you for the purchasing, your ticket has been processed, please check your email immediately</span>
            <div class="form-group">
              <button class="btn-done mt-4 mx-3" >DONE</button>
              <button class="btn-print mt-4" >Print Badges</button>
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
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      url: "",
      prev_action: "",
      qr_setting: "",
      ticket: "",
      isLoading: false,
      global_url: this.$globalURL,
      obj: {
        prev_action: "",
        events_id: "",
        ticket_level: "MT",
      },
    };
  },
  components: {
    Loading
  },
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
      });
    },
  },
  mounted() {
    this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    this.events_id = $cookies.get("events_id");
    if (this.events_id == null) {
      Swal.fire({
        title: "Your Session is Expired!",
        icon: "warning",
      });
      setTimeout(1000);
      this.$router.push("/");
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
