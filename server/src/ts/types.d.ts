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

interface StoreTeam extends ConfigTeam {
  id: number;
}

export interface ConfigTeam {
  slotId?: number;
  color: string;
  name: string;
}

export interface Branch {
  sub: Branch[];
}

export interface RootBranch {
  sub: [Branch, Branch];
}