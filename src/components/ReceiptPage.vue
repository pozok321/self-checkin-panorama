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
          receipt_data: {
          events_id: this.$route.params.Eventsid,
          order_id: localStorage.getItem("order_id"),
         },
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
          url: "/rsvp/getpaidticket",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.form_receipt,
        }).then(() => {
          this.isLoadingAnimation = false;
          console.log(this.form_receipt, "test123");
        });
      },
      },
  
      mounted() {
        if (this.event_detail === null) {
          this.$router.push("/eventdetailpage");
        } else {
          this.receiptList();
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