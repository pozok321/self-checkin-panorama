<template>
  <section class="vh-100" style="background-color: #f1f1f1">
    <div class="d-flex justify-content-center align-items-center h-100">
      <img src="../assets/image/circle-left.png" alt="circle-left" class="rounded-top-left" />
      <img src="../assets/image/circle-right.png" alt="circle-right" class="rounded-bottom-right" />
      <div class="col-12 col-md-6 col-lg-6 col-xl-4">
        <div class="card">
          <div class="justify-content-center d-md-flex">
            <img src="../assets/image/logo-undangin-blue.svg" alt="logo undangin" class="logo-undangin" />
            <img src="../assets/image/line1.svg" alt="line 1" width="2" class="spacing-line" />
            <p class="login">Log in</p>
          </div>
          <p class="text-center mb-5">Welcome to Check In Self Service</p>
          <div class="form-group">
            <label class="event-key" id="event_key">Event KEY</label>
            <div class="input-group">
              <input type="number" min="0" class="form__input" placeholder="Enter Event Key" v-model="obj.events_key" />
            </div>
          </div>
          <div class="form-group">
            <button class="button-login mt-4" @click="login_page()">Log In</button>
          </div>
        </div>
        <div class="copyright text-center mt-4">
          <p>Powered by Undangin | 2024</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
      obj: {
        events_id: "",
      },
    };
  },
  components: {
    Loading,
  },
  methods: {
    toggle_full_screen() {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          /* Firefox */
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          /* Chrome, Safari & Opera */
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.msRequestFullscreen) {
          /* IE/Edge */
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          /* Chrome, Safari and Opera */
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    },

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

    login_page() {
      axios({
        method: "post",
        url: "/selfsvc/login",
        data: this.obj,
        headers: {
          "Content-Type": "text/plain",
        },
      }).then((res) => {
        if (res.data != false) {
          this.isLoading = true;
          Swal.fire({
            title: "Login Success!",
            text: res.data.msg,
            icon: "success",
          });
          this.createCookie("token", res.data.token);
          this.createCookie("events_id", res.data.events_id);
          this.$router.push("/agendapage");
          // this.toggle_full_screen();
        } else if (res.data == "") {
          Swal.fire({
            title: "Incorrect Event Key / Event ID",
            text: res.data.msg,
            icon: "warning",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

h1,
h2,
h3,
h4 {
  margin-bottom: 0px;
}

.login {
  font-size: 3rem;
  color: #163c56;
  margin-bottom: 0px;
  font-weight: bold;
}

.event-id,
.event-key {
  color: #807b7b;
}

.logo-undangin {
  width: 200px;
}

.card {
  border: none !important;
  background-color: #f1f1f1;
}

.form__input {
  background-color: #f1f1f1;
  width: 100%;
  border: 0px solid transparent;
  border-radius: 0;
  border-bottom: 1px solid #000;
  padding: 1em 0.5em 0.5em;
  padding-left: 2em;
  outline: none;
  margin: 1.5em auto;
  transition: all 0.5s ease;
  font-family: Helvetica;
}

.login-page {
  width: 100%;
  height: 100vh;
  display: inline-block;
  display: flex;
  align-items: center;
}

.copyright p {
  color: #2e5d76;
  font-size: 8pt;
}

.bg-darkblue {
  background-color: #1a283d;
}

.spacing-line {
  margin-left: 10px;
  margin-right: 10px;
}

.rounded-top-left {
  position: absolute;
  top: 0;
  left: 0;
}

.rounded-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}

.width-50 {
  margin: auto;
  width: 50%;
}

.button-login {
  width: 100%;
  background-color: #163c56;
  color: #fff;
  font-family: Helvetica;
  border-radius: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16pt;
  font-weight: bold;
}
</style>
