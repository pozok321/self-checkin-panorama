import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Swal from 'sweetalert2';
import VueCookies from "vue-cookies";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
// import "bootstrap/dist/js/bootstrap.bundle";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap";


axios.defaults.baseURL = "https://apicorp.undangin.com/v1/";

const app = createApp(App);
app.use(router);
app.mount("#app");
