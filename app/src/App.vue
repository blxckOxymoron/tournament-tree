<template>
  <competition-teams />
  <competition-tree />
</template>

<script lang="ts">
import CompetitionTree from "./views/CompetitionTree.vue";
import CompetitionTeams from "@/views/CompetitionTeams.vue";
import { Options, Vue } from "vue-class-component";
import { Actions, Mutations } from "./store";
import { Branch, RootBranch, StoreTeam, TransmittedState } from "./types";
@Options({
  components: { CompetitionTree, CompetitionTeams },
})
export default class App extends Vue {
  mounted(): void {
    this.$store.dispatch(Actions.SETUP_SOCKET);
    setTimeout(this.simulateData, 2e3);
    setTimeout(this.simulateMove, 4e3);
  }

  simulateData(): void {
    console.log("data arriving");
    let teams: StoreTeam[] = [
      {
        name: "yoooo team",
        color: "#9A879D",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#EF233C",
        slotId: 12,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#D80032",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#A49966",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#FF570A",
        slotId: -1,
        id: -1,
      },
      {
        name: "yoooo team",
        color: "#9A879D",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#EF233C",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#D80032",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#A49966",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#FF570A",
        slotId: -1,
        id: -1,
      },
      {
        name: "yoooo team",
        color: "#9A879D",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#EF233C",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#D80032",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#A49966",
        slotId: -1,
        id: -1,
      },
      {
        name: "TEAM 2 4 U",
        color: "#FF570A",
        slotId: -1,
        id: -1,
      },
      {
        name: "W4F",
        color: "#12355B",
        slotId: -1,
        id: -1,
      },
    ];
    let wmBranch: Branch = {
      sub: Array<Branch>(2).fill({
        sub: Array<Branch>(2).fill({
          sub: Array<Branch>(2).fill({
            sub: [],
          }),
        }),
      }),
    };
    let tree: RootBranch = {
      sub: [wmBranch, wmBranch],
    };

    const state: TransmittedState = {
      isAdmin: false,
      tree,
      teams: teams.map((tm, i) => ({ ...tm, id: i })),
    };
    this.$store.commit(Mutations.SET_ALL, { state });
  }
  simulateMove(): void {
    let data = {
      name: Mutations.MOVE_TEAM,
      payload: { team: 2, to: 20, fromServer: false },
    };
    data.payload.fromServer = true;
    this.$store.commit(data.name, data.payload);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--clr-text);
}

* {
  margin: 0;
}
html,
body,
#app {
  min-height: 100vh;
  background-color: var(--clr-bg);
}
h2 {
  font: var(--fn-24);
}
</style>
