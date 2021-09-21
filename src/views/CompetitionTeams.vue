<template>
  <div class="teams">
    <team-display v-for="(team, i) of teams" :key="i" :team="team" />
  </div>
</template>

<script lang="ts">
import { Team } from "@/types";
import { Options, Vue } from "vue-class-component";
import TeamDisplay from "@/components/TeamDisplay.vue";

@Options({
  components: { TeamDisplay },
})
export default class CompetitionTeams extends Vue {
  teams: Team[] = [
    {
      name: "yoooo team",
      color: "#fff",
    },
    {
      name: "TEAM 2 4 U",
      color: "#fff",
    },
  ];
}
</script>

<style lang="scss">
.teams {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
