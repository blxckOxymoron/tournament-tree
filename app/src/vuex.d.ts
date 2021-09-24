// vuex.d.ts
import { Store } from "vuex";
import { StoreSlotCoords, StoreTeamSlot, StoreTeam } from "./types";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    teamSlots: StoreTeamSlot[];
    slotPositions: StoreSlotCoords[];
    teams: StoreTeam[];
    nextSlotId: number;
    nextTeamId: number;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $el?: Element;
  }
}
