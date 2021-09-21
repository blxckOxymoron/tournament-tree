<template>
  <div class="root-branch branch">
    <branch-display
      v-if="branch.sub && branch.sub.length > 0"
      :branch="branch.sub[0]"
      :reverse="true"
      :parent-slot="_slot"
    />

    <div class="team-placeholder" :style="`background: ${slot.color};`">
      <h2>{{ slot.id }}</h2>
    </div>

    <branch-display
      v-if="branch.sub && branch.sub.length > 1"
      :branch="branch.sub[1]"
      :reverse="false"
      :parent-slot="_slot"
    />
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import BranchDisplay from "./BranchDisplay.vue";

@Options({
  components: { BranchDisplay },
})
export default class RootBranchDisplay extends BranchDisplay {}
</script>
