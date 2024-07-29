import { createRouter, createWebHistory } from "vue-router";
import ScanView from "../views/ScanView.vue";
import LoginView from "../views/LoginView.vue";
import AgendaView from "../views/AgendaView.vue";
import EventDetailView from "../views/EventDetailView.vue";
import HomeRegistrationView from "../views/HomeRegistrationView.vue";
import CompletedView from "../views/CompletedView.vue";
import MyCartView from "../views/MyCartView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import QuestionnaireView from "../views/QuestionnaireView.vue";
import PaymentView from "../views/PaymentView.vue";
import SuccessPageView from "../views/SuccessPageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "loginpage",
      component: LoginView,
    },
    {
      path: "/agendapage",
      name: "agendapage",
      component: AgendaView,
    },
    {
      path: "/eventdetailpage",
      name: "eventdetailpage",
      component: EventDetailView,
    },
    {
      path: "/scanpage",
      name: "scanpage",
      component: ScanView,
    },
    {
      path: "/homeregistrationpage",
      name: "homeregistrationpage",
      component: HomeRegistrationView,
    },
    {
      path: "/completed",
      name: "completed",
      component: CompletedView,
    },
    {
      path: "/mycart",
      name: "mycart",
      component: MyCartView,
    },
    {
      path: "/registrationpage",
      name: "registrationpage",
      component: RegistrationView,
    },
    {
      path: "/questionnairepage",
      name: "questionnairepage",
      component: QuestionnaireView,
    },
    {
      path: "/paymentpage",
      name: "paymentpage",
      component: PaymentView,
    },
    {
      path: "/successpage",
      name: "successpage",
      component: SuccessPageView,
    },

    {
      path: '/ticketlist/:Eventsid',
      name: 'ticketlist',
      component: () => import('../components/HomeRegistrationPage.vue') 
    },

    {
      path: '/mycart/:Eventsid',
      name: 'mycart',
      component: () => import('../components/MyCartPage.vue') 
    },
  ],
});

export default router;