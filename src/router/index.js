import { createRouter, createWebHistory } from "vue-router";
import ScanView from "../views/ScanView.vue";
import LoginView from "../views/LoginView.vue";
import AgendaView from "../views/AgendaView.vue";
import EventDetailView from "../views/EventDetailView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import CompletedView from "../views/CompletedView.vue";
import MyCartView from "../views/MyCartView.vue";

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
      path: "/registrationpage",
      name: "registrationpage",
      component: RegistrationView,
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

    // {
    //   path: '/ticketlist/:Eventsid',
    //   name: 'ticketlist',
    //   component: () => import('../pages/TicketList.vue')
    // },
  ],
});

export default router;
