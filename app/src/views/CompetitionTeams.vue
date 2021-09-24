<template>
  <div class="teams" v-if="teams.length > 0">
    <team-display v-for="(team, i) of teams" :key="i" :team="team" />
  </div>
</template>

<script lang="ts">
import { StoreTeam } from "@/types";
import { Options, Vue } from "vue-class-component";
import TeamDisplay from "@/components/TeamDisplay.vue";

@Options({
  components: { TeamDisplay },
})
export default class CompetitionTeams extends Vue {
  get teams(): StoreTeam[] {
    return this.$store.state.teams;
  }
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
