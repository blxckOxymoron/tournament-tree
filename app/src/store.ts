import { State } from "vue";
import { createStore } from "vuex";
import { SlotColors } from "./main";
import {
  Coords2d,
  MutationData,
  StoreTeam,
  StoreTeamSlot,
  TransmittedState,
} from "./types";
import { io } from "socket.io-client";

const urlParams = new URLSearchParams(window.location.search);
const socket = io({
  extraHeaders: {
    admin: urlParams.get("admin") || "",
  },
  reconnectionAttempts: 20,
});

export const store = createStore({
  state(): State {
    return {
      teamSlots: [],
      slotPositions: [],
      teams: [],
      nextSlotId: 0,
      nextTeamId: 0,
      isAdmin: false,
      tree: null,
    };
  },
  mutations: {
    setAll(state: State, payload: { state: TransmittedState }) {
      state.isAdmin = payload.state.isAdmin;
      state.teams = payload.state.teams;
      state.tree = payload.state.tree;
      state.nextTeamId =
        payload.state.teams.reduce((acc, val) => Math.max(acc, val.id), -1) + 1;
    },
    registerTeam(state: State, payload: { id: number; team: StoreTeam }) {
      state.teams.push({
        ...payload.team,
        id: payload.id,
        slotId: -1,
      });
      state.nextTeamId++;
    },
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
    moveTeam(state: State, payload: { to: number; team: number }) {
      const team = state.teams.find((tm) => tm.id === payload.team);
      const fromSl = state.teamSlots.find((sl) => sl.id === team?.slotId);
      if (team) team.slotId = payload.to;

      if (fromSl) {
        fromSl.full = false;
        fromSl.color = SlotColors.EMPTY;
      }
      const toSl = state.teamSlots.find((sl) => sl.id === payload.to);
      if (toSl) {
        toSl.full = true;
        toSl.color = team?.color || SlotColors.EMPTY;
      }

      const mutData: MutationData = {
        name: Mutations.MOVE_TEAM,
        fromId: socket.id,
        payload,
      };
      socket.emit("mutation", mutData);
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
    team: (state) => (id: number) => {
      return state.teams.find((tm) => tm.id === id);
    },
    slotPos: (state) => (id: number) => {
      return state.slotPositions.find((pos) => pos.id === id);
    },
    nextSlotId: (state) => {
      return state.nextSlotId;
    },
    nextTeamId: (state) => {
      return state.nextTeamId;
    },
  },
  actions: {
    setupSocket({ commit }) {
      socket.on("mutation", (data: MutationData) => {
        if (data.fromId === socket.id) return;
        if (!Object.values(Mutations).includes(data.name)) return;
        commit(data.name, data.payload);
      });
    },
  },
});

export const Mutations = {
  REGISTER_SLOT: "registerSlot",
  REGISTER_TEAM: "registerTeam",
  MOVE_TEAM: "moveTeam",
  MARK_SNAP_SLOT: "markSnapSlot",
  SET_ALL: "setAll",
};

export const Actions = {
  SETUP_SOCKET: "setupSocket",
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
