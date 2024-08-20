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
              <button class="btn-done mt-4 mx-3" @click="payment_cancel();">CANCEL</button>
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
              title: "success",
              icon: "success",
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
        console.log(this.form_cancel.transaction_id, "formcancel");
        this.isLoadingAnimation = true;
        axios({
          url: "/midtrans/cancelpay",
          // headers: {
          //   "Content-Type": "text/plain",
          // },
          method: "POST",
          data: this.form_cancel,
        }).then((res) => {
          
          if (res.data.status_code == 200) {
            console.log(this.cancel_payment, "test123");
            Swal.fire({
              title: "success",
              icon: "success",
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
    font-size:1rem;
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