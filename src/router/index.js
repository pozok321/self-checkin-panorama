import { createRouter, createWebHistory } from "vue-router";
import ScanView from "../views/ScanView.vue";
import LoginView from "../views/LoginView.vue";
import AgendaView from "../views/AgendaView.vue";
import EventDetailView from "../views/EventDetailView.vue";
import HomeRegistrationView from "../views/HomeRegistrationView.vue";
import CompletedView from "../views/CompletedView.vue";

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
      path: '/ticketlist/:Eventsid',
      name: 'ticketlist',
      component: () => import('../components/HomeRegistrationPage.vue') 
    },

    {
      path: '/mycart/:Eventsid',
      name: 'mycart',
      component: () => import('../components/MyCartPage.vue') 
    },
    {
      path: '/registrationpage/:Eventsid',
      name: 'registrationpage',
      component: () => import('../components/RegistrationPage.vue') 
    },
    {
      path: '/questionnairepage/:Eventsid',
      name: 'questionnairepage',
      component: () => import('../components/QuestionnairePage.vue') 
    },
    {
      path: '/checkoutpage/:Eventsid',
      name: 'checkoutpage',
      component: () => import('../components/CheckoutPage.vue') 
    },
    {
      path: '/sucesspage/:Eventsid',
      name: 'sucesspage',
      component: () => import('../components/SuccessPage.vue') 
    },
  ],
});

export default router;