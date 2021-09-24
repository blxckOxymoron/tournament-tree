<template>
  <div class="tree">
    <root-branch-display v-if="tree" :branch="tree" />
    <!-- <branch-display :branch="tree.sub[0]" :reverse="true" />
    <branch-display :branch="tree.sub[1]" :reverse="false" /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RootBranch } from "@/types";
import BranchDisplay from "@/components/BranchDisplay.vue";
import RootBranchDisplay from "@/components/RootBranchDisplay.vue";

@Options({
  components: { BranchDisplay, RootBranchDisplay },
})
export default class CompetitionTree extends Vue {
  get tree(): RootBranch | null {
    return this.$store.state.tree;
  }
}
</script>

<style>
.tree {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  min-height: 100vh;
  pointer-events: none;
}
</style>
