export interface Branch {
  sub: Branch[];
}

export interface IdBranch extends Branch {
  id: number;
}

export interface RootBranch extends Branch {
  sub: [Branch, Branch];
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

export interface MutationData {
  fromId: string;
  name: string;
  payload: Record<string, unknown>;
}

export interface TransmittedState {
  teams: StoreTeam[];
  isAdmin: boolean;
  tree: RootBranch;
}
