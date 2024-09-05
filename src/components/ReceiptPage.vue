<template>
    <section class="vh-100">
      <div class="container">
        <div class="row">
          <div class="d-flex">
            <img :src=" this.qr_payment" alt="banner" class="poster-mobile-img m-auto">
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
          urlGateway: JSON.parse(localStorage.getItem("urlGateway")),
          poster_mobile: localStorage.getItem("poster_mobile"),
          order_id: localStorage.getItem("order_id"),
          events_id: this.$route.params.Eventsid,
          ticket_name: "",
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
        receiptList() {
        this.isLoadingAnimation = true;
        axios({
          url: "/rsvp/receipt/ticketlist",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.form_cancel,
        }).then(() => {});
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
  </style>