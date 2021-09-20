<template>
  <div
    class="branch"
    :style="'flex-direction: ' + (reverse ? 'row-reverse' : 'row') + ';'"
  >
    <div class="team-placeholder">
      <h2>?</h2>
    </div>
    <branch-connector :width="reverse ? -32 : 32" :height="cHeight" />
    <div class="children">
      <branch-display
        v-for="(next, i) in branch.sub"
        :key="i"
        :branch="next"
        :reverse="reverse"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Branch, TeamSlot } from "@/types";
import { Options, Vue } from "vue-class-component";
import BranchConnector from "@/components/BranchConnector.vue";

@Options({
  name: "BranchDisplay",
  props: {
    branch: Object,
    reverse: Boolean,
  },
  components: { BranchDisplay, BranchConnector },
})
export default class BranchDisplay extends Vue {
  branch!: Branch;
  reverse!: boolean;
  /*
  get teamSlot(): TeamSlot {
    let parentSlot: TeamSlot = {
      x: 0,
      y: 0,
      color: "#fffeee",
      full: false,
    };
    if ("teamSlot" in (this.$parent?.$data || {}))
      parentSlot = this.$parent?.$data;
  }
  */

  get cHeight(): number {
    const thisBound: DOMRect = this.$el.getBoundingClientRect();
    const parentBound: DOMRect = this.$parent?.$el.getBoundingClientRect();
    return (
      thisBound.y +
      thisBound.height / 2 -
      (parentBound.y + parentBound.height / 2)
    );
  }
}
</script>

<style lang="scss">
.branch {
  display: flex;
  align-items: center;
  position: relative;

  .team-placeholder {
    margin: 0.5rem 1rem;
    min-width: var(--width-team);
    height: 30px;
    padding: 0.5rem;
    border-radius: 2rem;
    text-align: center;
    background-color: var(--clr-empty);
    user-select: none;
  }
}
.children {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
