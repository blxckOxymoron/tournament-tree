# simple tournamet display with socket.io, express, vue & typescript

- will host on 3030 (no way to change it yet 🤷‍♂️)
- needs a config.json in the same directory
- this site exists in ligh and dark mode, so select your team colors wisely
- open localhost:3030 to connect; to log in as admin use localhost:3030/?admin=ADMIN_ID where ADMIN_ID is replaced with the key form the config.json (see below)

## config.json (for initial state)

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
