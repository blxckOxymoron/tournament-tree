export interface Branch {
  sub: Branch[];
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
}
