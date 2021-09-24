export const Mutations = {
  REGISTER_SLOT: "registerSlot",
  REGISTER_TEAM: "registerTeam",
  MOVE_SLOT: "moveSlot",
  MARK_SNAP_SLOT: "markSnapSlot",
  SET_ALL: "setAll",
};

export const TransmittedMutations = {
  REGISTER_SLOT: "registerSlot",
  REGISTER_TEAM: "registerTeam",
  MOVE_SLOT: "moveSlot",
}

export interface Branch {
  sub: Branch[];
}

export interface RootBranch extends Branch {
  sub: [Branch, Branch];
}

export interface IdBranch extends Branch {
  id: number;
}

export interface Coords2d {
  x: number;
  y: number;
}

export interface StoreTeamSlot {
  id: number;
  full: boolean;
  color: string;
}

export interface StoreSlotCoords extends Coords2d {
  id: number;
}

export interface Team {
  color: string;
  name: string;
}

export interface StoreTeam extends Team {
  id: number;
  slotId: number;
}

export interface State {
  teamSlots: StoreTeamSlot[];
  slotPositions: StoreSlotCoords[];
  teams: StoreTeam[];
  nextSlotId: number;
  nextTeamId: number;
  isAdmin: boolean;
}

export enum SlotColors {
  EMPTY = "var(--clr-slot-empty)",
  SNAP = "var(--clr-slot-snap)",
  BEATEN = "var(--clr-slot-beaten)",
  TEXT_BEATEN = "var(--clr-text-beaten)",
  TEXT = "var(--clr-text)",
  BACKGROUND = "var(--clr-bg)",
  LOADING = "var(--clr-bg)",
}

export interface MutationData {
  fromId: string;
  name: string;
  payload: object;
}