<template>
  <section class="vh-100">
    <div class="content-limit">
      <div class="wrap-content bg-white">
        <div class="formRSVP">
          <h4 class="text-center">Ticket List</h4>
          <div class="order-id text-center">
            <p>Order ID </p>
          </div>
          <div class="row guest-wrap">
            <div class="guest-box" v-for="receiptData in receipt">
              <div class="row">
                <div class="col-lg-8 col-sm-7 col-7">
                  <div class="fontblack-12pt">
                    {{ receiptData.fullname }}
                  </div>
                  <div class="fontgrey-12pt">
                    {{ receiptData.ticket_name}}
                  </div>
                </div>
                <div class="col-lg-4 col-sm-4 col-4 text-end">
                  <button class=" btn btn-choose" @click="receiptDetail(receiptData)">detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        events_id: this.$route.params.Eventsid,
        event_detail: JSON.parse(localStorage.getItem("event_details")),
        urlGateway: JSON.parse(localStorage.getItem("urlGateway")),
        poster_mobile: localStorage.getItem("poster_mobile"),
        receipt_data: {
          events_id: this.$route.params.Eventsid,
          order_id: localStorage.getItem("order_id"),
        },
        show_qr: {
          evidenc: localStorage.getItem("evidenc"),
          order_id: localStorage.getItem("order_id"),
          guests_token: localStorage.getItem("token")
        },
        ticket_name: "",
        LoadingButton: false,
        isLoadingAnimation: false,
        global_url: this.$globalURL,
        ticket_receipt: [],
        receipt: [],
        isLoading: false,
        isLoadingHeader: false,
        route_name: this.$route.name,
        ticketlist : false,
        ticketdetail : false,
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
          data: this.receipt_data,
        }).then((res) => {
          this.receipt = res.data;
        });
      },
      receiptDetail(receiptData) {
        this.show_qr.guests_token = receiptData.token;
        this.isLoadingAnimation = true;
        axios({
          url: "/rsvp/receipt/details",
          headers: {
            "Content-Type": "text/plain",
          },
          method: "POST",
          data: this.show_qr,
        }).then((res) => {
          this.receipt_details = res.data;
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

  .btn-choose {
    width: auto;
    max-width: auto;
    padding: 8px;
    font-size: 12px;
    color: #fff;
    border-radius: 20px;
    background: #315568;
    margin: 2px;
  }

  .content-limit {
    position: relative;
    width: 100%;
  }

  .fontblack-12pt {
    font-family: PlusJakartaSans;
    font-weight: 700;
    font-size: 12pt;
    color: #000;
    line-height: 1;
  }

  .fontgrey-12pt {
    font-family: PlusJakartaSans;
    font-size: 12pt;
    color: #9a9a9a;
  }

  .formRSVP {
    margin: auto;
    width: 100%;
    max-width: 600px;
    padding: 30px 20px;
    position: relative;
  }

  .wrap-content {
    position: absolute;
    top: -20px;
    width: 100%;
    min-height: 800px;
    background: #f2f5f8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 3px 6px #00000029;
  }

  .bg-white {
    background-color: #fff;
  }

  .guest-box {
    font-size: 10pt;
    padding: 15pt;
    margin-bottom: 10pt;
    border-radius: 7pt;
    background: #f2f5f8;
  }

  .guest-wrap {
    margin: 10px 0 100px;
  }
</style>