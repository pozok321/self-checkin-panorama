<template>
    <section class="vh-100">
      <div class="container">
        <div class="row">
          <div class="text-center my-5">
            <h1>Register</h1>
            <span>Enter your full name, E-mail, and password to register</span>
          </div>
          <div id="input-data" class="w-75 m-auto">
            <form>
              <div class="mb-3">
                <input type="email" class="form-control" id="fullname" aria-describedby="emailHelp" placeholder="Full Name" />
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="email" placeholder="Email" />
                </div>
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="confirmationemail" placeholder="Confirmation E-mail" />
                </div>
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="countrycode" placeholder="Country" />
                </div>
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="province" placeholder="Province" />
                </div>
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="city" placeholder="City" />
                </div>
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="phone" placeholder="Phone" />
                </div>
                <div class="mb-3 col-md-6">
                  <input type="password" class="form-control" id="company" placeholder="Company" />
                </div>
              </div>
            </form>
            <div class="form-group text-end">
              <button class="btn-back mt-4 mx-3" @click="confirmGetTicket()">Back</button>
              <button class="btn-next mt-4" @click="confirmGetTicket()">Next</button>
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
      createCookie(name, value, day) {
        if (day) {
          let currentDate = new Date();
          currentDate.setTime(currentDate.getTime() + day * 24 * 60 * 60 * 1000);
          var expires = "expires=" + currentDate.toGMTString();
        } else {
          var expires = "";
        }
        document.cookie = name + "=" + value + ";" + expires + "; path=/";
      },
      getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
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
  
          // this.ticket_level = this.ticket.ticket_level;
          // this.prev_action = this.ticket.prev_action;
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
  
  .text-white {
    color: #fff;
  }
  
  .border-dash {
    border-style: dashed;
    border-width: thin;
    border-radius: 20px;
  }
  
  .card-deck {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
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
  
  .btn-back {
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
  
  .btn-next {
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
  
  .bg-registration-page {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
  }
  
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  </style>