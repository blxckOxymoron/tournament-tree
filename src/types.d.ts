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

export interface TeamSlot extends Coords2d {
  x: number;
  y: number;
  full: boolean;
  beaten: boolean;
  color: string;
}

export interface Team {
  color: string;
  name: string;
}
