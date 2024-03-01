import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Swal from 'sweetalert2';
import VueCookies from "vue-cookies";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";


axios.defaults.baseURL = "https://apicorp.undangin.com/v1/";

const app = createApp(App);
app.use(router);
app.mount("#app");
