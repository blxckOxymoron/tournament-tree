import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import CompetitionTree from "../views/CompetitionTree.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: CompetitionTree,
  },
];

//? route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
