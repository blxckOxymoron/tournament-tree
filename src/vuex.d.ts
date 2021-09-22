// vuex.d.ts
import { Store } from "vuex";
import { StoreSlotCoords, StoreTeamSlot } from "./types";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    teamSlots: StoreTeamSlot[];
    slotPositions: StoreSlotCoords[];
    nextSlotId: number;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $el?: Element;
  }
}
