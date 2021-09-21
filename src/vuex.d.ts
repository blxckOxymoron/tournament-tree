// vuex.d.ts
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { TeamSlot } from "./types";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    teamSlots: TeamSlot[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $el?: Element;
  }
}
