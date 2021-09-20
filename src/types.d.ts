export interface Branch {
  sub: Branch[];
}

export interface TeamSlot {
  x: number;
  y: number;
  full: boolean;
  color: string;
}
