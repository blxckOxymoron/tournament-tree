import { createApp } from "vue";
import { store } from "@/store";
import App from "./App.vue";

export enum SlotColors {
  EMPTY = "var(--clr-slot-empty)",
  SNAP = "var(--clr-slot-snap)",
}

createApp(App).use(store).mount("#app");
