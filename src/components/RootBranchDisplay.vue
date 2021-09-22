<template>
  <div class="root-branch branch">
    <branch-display
      v-if="branch.sub && branch.sub.length > 0"
      :branch="branch.sub[0]"
      :reverse="true"
      :parent-slot-id="_slotId"
      :parent-beaten="beaten"
    />

    <div
      class="team-placeholder"
      :style="`background-color: ${teamSlot ? teamSlot.color : 'orange'};`"
    >
      <h2>{{ beaten }}</h2>
    </div>

    <branch-display
      v-if="branch.sub && branch.sub.length > 1"
      :branch="branch.sub[1]"
      :reverse="false"
      :parent-slot-id="_slotId"
      :parent-beaten="beaten"
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
