import { createApp } from "vue";
import { store } from "@/store";
import App from "./App.vue";

export enum SlotColors {
  EMPTY = "var(--clr-slot-empty)",
  SNAP = "var(--clr-slot-snap)",
  BEATEN = "var(--clr-slot-beaten)",
  TEXT_BEATEN = "var(--clr-text-beaten)",
  TEXT = "var(--clr-text)",
  BACKGROUND = "var(--clr-bg)",
  LOADING = "var(--clr-bg)",
}

createApp(App).use(store).mount("#app");
