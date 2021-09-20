import { State } from "vue";
import { createStore } from "vuex";
import { TeamSlot } from "./types";

export const store = createStore({
  state(): State {
    return {
      teamSlots: [],
    };
  },
  mutations: {
    registerSlot(state: State, slot: TeamSlot) {
      if (!state.teamSlots.includes(slot)) state.teamSlots.push(slot);
    },
  },
  getters: {
    closestOpenSlot: (state) => (x: number, y: number) => {
      return state.teamSlots.reduce((pSlot, cSlot) => {
        const pDistance = Math.sqrt((x - pSlot.x) * 2 + (y - pSlot.y) * 2),
          cDistance = Math.sqrt((x - cSlot.x) * 2 + (y - cSlot.y) * 2);
        return pDistance > cDistance ? pSlot : cSlot;
      });
    },
  },
});
