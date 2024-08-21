<template>
  <section class="vh-100">
    <div class="container">
      <div class="d-flex ">
        <img :src=" this.qr_payment" alt="banner" class="poster-mobile-img m-auto">
      </div>
    </div>
    <div class="container">
      <div class="payment-success col-md-9 m-auto mt-5">
        <div class="row align-center">
          <div class="col-md-3">
            <img src="../assets/image/icon-ceklis.png" alt="icon-ceklis" />
          </div>
          <div class="col-md-9">
            <h1 class="text-start py-3">Waiting Payment</h1>
            <span class="thank-you">Thank you for the purchasing, your ticket has been processed, please check your
              email immediately</span>
            <div class="form-group">
              <button class="btn-done mt-4 mx-1" @click="payment_cancel();">CANCEL</button>
              <button class="btn-print mt-4" @click="check_status();">PAYMENT STATUS</button>
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
    components: {},
    methods: {
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
              title: "",
              icon: "Transaction Canceled",
              text: res.data.status_message,
            }).then((value) => {});
          } else {
            this.isLoadingAnimation = false;
            Swal.fire({
              title: "Warning",
              icon: "warning",
              text: res.data.status_message,
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
              localStorage.clear();
              is.$router.push("/eventdetailpage");
            });
          } else {
            this.isLoadingAnimation = false;
            Swal.fire({
              title: "Warning",
              icon: "warning",
              text: res.data.status_message,
            }).then((value) => {});
          }
        });
      },
    },

    mounted() {
      if (this.event_detail === null) {
        this.$router.push("/eventdetailpage");
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
    max-height: 250px;
  }
</style>