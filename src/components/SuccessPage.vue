<template>
  <section class="vh-100 container-fluid">
    <div class="row">
      <img src="../assets/image/banner.png" alt="banner" width="100%" />
    </div>
    <div class="container">
      <div class="payment-success col-md-9 m-auto">
        <div class="row align-center">
          <div class="col-md-2">
            <img src="../assets/image/icon-ceklis.png" alt="icon-ceklis" />
          </div>
          <div class="col-md-10">
            <h1 class="text-start">Payment Success, Thank you</h1>
            <span>Thank you for the purchasing, your ticket has been processed, please check your email immediately</span>
            <div class="form-group">
              <button class="btn-done mt-4 mx-3" @click="confirmGetTicket()">DONE</button>
              <button class="btn-print mt-4" @click="confirmGetTicket()">Print Badges</button>
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

.flex {
  display: flex;
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
