import { State } from "vue";
import { createStore } from "vuex";
import { SlotColors } from "./main";
import { Coords2d, StoreTeamSlot } from "./types";

export const store = createStore({
  state(): State {
    return {
      teamSlots: [],
      slotPositions: [],
      nextSlotId: 0,
    };
  },
  mutations: {
    registerSlot(state: State, payload: { id: number; pos: Coords2d }) {
      state.teamSlots.push({
        id: payload.id,
        full: false,
        color: SlotColors.EMPTY,
      });
      state.slotPositions.push({
        id: payload.id,
        x: payload.pos.x,
        y: payload.pos.y,
      });
      state.nextSlotId++;
    },
    moveSlot(state: State, payload: { from: number; to: number }) {
      const fromSl = state.teamSlots[payload.from];
      if (fromSl) fromSl.full = false;
      const toSl = state.teamSlots[payload.to];
      if (toSl) toSl.full = true;
    },
    markSnapSlot(
      state: State,
      payload: { id: number; allowMultiple: boolean }
    ) {
      //* clear current snapSlot
      state.teamSlots.forEach((slot) => {
        if (slot.id === payload.id) {
          slot.color = SlotColors.SNAP;
          return;
        }
        if (slot.color === SlotColors.SNAP && !payload.allowMultiple)
          slot.color = SlotColors.EMPTY;
      });
    },
  },
  getters: {
    closestOpenSlot: (state) => (x: number, y: number) => {
      let bestSlot: StoreTeamSlot | undefined;

      let bestDistance = Infinity;
      state.teamSlots.forEach((slot) => {
        if (slot.full) return;

        const slotPoint = state.slotPositions.find((sp) => sp.id === slot.id);
        if (!slotPoint) return;

        const slotDistance = pointDistance(slotPoint, { x, y });
        if (slotDistance < bestDistance) {
          bestSlot = slot;
          bestDistance = slotDistance;
        }
      });
      return bestSlot;
    },
    slot: (state) => (id: number) => {
      return state.teamSlots.find((sl) => sl.id === id);
    },
    slotPos: (state) => (id: number) => {
      return state.slotPositions.find((pos) => pos.id === id);
    },
    nextSlotId: (state) => {
      return state.nextSlotId;
    },
  },
});

export const Mutations = {
  REGISTER_SLOT: "registerSlot",
  MOVE_SLOT: "moveSlot",
  MARK_SNAP_SLOT: "markSnapSlot",
};

function pointDistance(p1: Coords2d, p2: Coords2d) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function closestPoint(
  points: (Coords2d | undefined)[],
  target: Coords2d
): Coords2d | undefined {
  return points.reduce((pSlot, cSlot) => {
    if (!pSlot) return cSlot;
    if (!cSlot) return pSlot;
    const pDistance = Math.hypot(pSlot.x - target.x, pSlot.y - target.y);
    const cDistance = Math.hypot(cSlot.x - target.x, cSlot.y - target.y);
    return pDistance < cDistance ? pSlot : cSlot;
  });
}
