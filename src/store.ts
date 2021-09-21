import { State } from "vue";
import { createStore } from "vuex";
import { Coords2d, TeamSlot } from "./types";

export const store = createStore({
  state(): State {
    return {
      teamSlots: [],
    };
  },
  mutations: {
    registerSlot(state: State, playload: { slot: TeamSlot }) {
      state.teamSlots.push(playload.slot);
    },
    fillClosestOpenSlot(state: State, playload: { coords: Coords2d }) {
      return closestPoint(
        state.teamSlots.filter((slot) => !slot.full),
        playload.coords
      );
    },
  },
  getters: {
    closestOpenSlot: (state) => (x: number, y: number) => {
      const notFullSlots = state.teamSlots.filter((slot) => !slot.full);
      return closestPoint(notFullSlots, { x, y });
    },
    slot: (state) => (x: number, y: number) => {
      return (
        state.teamSlots.find((sl) => sl.x === x && sl.y === y) || {
          x,
          y,
          color: "red",
          full: false,
          beaten: false,
        }
      );
    },
  },
});

export const Mutations = {
  REGISTER_SLOT: "registerSlot",
};

export function closestPoint(points: Coords2d[], target: Coords2d): Coords2d {
  return points.reduce((pSlot, cSlot) => {
    const pDistance = Math.hypot(pSlot.x - target.x, pSlot.y - target.y);
    const cDistance = Math.hypot(cSlot.x - target.x, cSlot.y - target.y);
    return pDistance < cDistance ? pSlot : cSlot;
  });
}

/**
 * old Id getters
 *
    slotId: (state) => (id: number) => {
      return state.teamSlots.find((sl) => sl.id === id);
    },
    nextSlotId: (state) => {
      return state.nextId++;
    },
 */
