import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DefaultLayout from "../views/Layouts/DefaultLayout.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: HomeView },
      { path: "about", component: AboutView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
