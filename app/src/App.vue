<template>
  <competition-tree />
  <competition-teams />
</template>

<script lang="ts">
import CompetitionTree from "./views/CompetitionTree.vue";
import CompetitionTeams from "@/views/CompetitionTeams.vue";
export default {
  components: { CompetitionTree, CompetitionTeams },
};
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
