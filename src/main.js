import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Swal from 'sweetalert2';
import VueCookies from "vue-cookies";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.js";

axios.defaults.baseURL = "https://apicorp.undangin.com/v1/";

const app = createApp(App);
app.config.globalProperties.$globalURL = "https://corp.undangin.com/"
app.use(router);
app.mount("#app");
