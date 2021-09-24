// vuex.d.ts
import { Store } from "vuex";
import { StoreSlotCoords, StoreTeamSlot, StoreTeam, RootBranch } from "./types";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    teamSlots: StoreTeamSlot[];
    slotPositions: StoreSlotCoords[];
    teams: StoreTeam[];
    nextSlotId: number;
    nextTeamId: number;
    isAdmin: boolean;
    tree: RootBranch | null;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $el?: Element;
  }
}
