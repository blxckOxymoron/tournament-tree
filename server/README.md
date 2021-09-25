# tournament-tree

this site exists in ligh and dark mode, so select your team colors wisely

## config (for initial state)

- tree: RootBranch

interface Branch {
sub: Branch[];
}

interface RootBranch {
sub: [Branch, Branch];
}

- teamsTemplate: Team[]

interface Team {
name: string
color: string
slotId?: number
}

- adminId: string
